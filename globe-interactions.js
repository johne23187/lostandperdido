/* Shared camera controls and screen-space marker spacing for both globes. */
(() => {
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  function separate(points,width){
    const placed=points.map((p,i)=>({...p,x:p.x+(i%2?0.01:-0.01),y:p.y}));
    for(let pass=0;pass<90;pass++){
      let collisions=0;
      for(let i=0;i<placed.length;i++)for(let j=i+1;j<placed.length;j++){
        const a=placed[i],b=placed[j],dx=b.x-a.x,dy=b.y-a.y;
        const ox=(a.width+b.width)/2+8-Math.abs(dx),oy=(a.height+b.height)/2+8-Math.abs(dy);
        if(ox<=0||oy<=0)continue;
        collisions++;
        if(ox<oy){const move=(ox+.2)/2*(dx>=0?1:-1);a.x-=move;b.x+=move;}
        else{const move=(oy+.2)/2*(dy>=0?1:-1);a.y-=move;b.y+=move;}
      }
      placed.forEach(p=>{p.x=clamp(p.x,p.width/2+5,width-p.width/2-5);p.y=clamp(p.y,p.height/2+5,width-p.height/2-5);});
      if(!collisions)break;
    }
    // Resolve any edge-constrained leftovers without hiding a destination.
    const settled=[];
    for(const point of placed){
      const clear=(x,y)=>settled.every(other=>Math.abs(x-other.x)>=(point.width+other.width)/2+8||Math.abs(y-other.y)>=(point.height+other.height)/2+8);
      if(!clear(point.x,point.y)){
        let found=false;
        for(let radius=8;radius<width*1.5&&!found;radius+=8){
          const steps=Math.max(12,Math.ceil(2*Math.PI*radius/8));
          for(let step=0;step<steps;step++){
            const angle=step/steps*Math.PI*2,x=point.x+Math.cos(angle)*radius,y=point.y+Math.sin(angle)*radius;
            if(x<point.width/2+5||x>width-point.width/2-5||y<point.height/2+5||y>width-point.height/2-5||!clear(x,y))continue;
            point.x=x;point.y=y;found=true;break;
          }
        }
      }
      settled.push(point);
    }
    return settled;
  }
  // Group close geographic anchors instead of moving pins away from land.
  function cluster(points,gap=42){
    const groups=[];
    for(const point of points){
      const nearby=groups.find(group=>Math.hypot(group[0].x-point.x,group[0].y-point.y)<gap);
      if(nearby)nearby.push(point);else groups.push([point]);
    }
    return groups;
  }
  function markerLayout(surface,items){
    const width=surface.clientWidth;
    if(!width)return;
    const points=items.filter(item=>!item.button.hidden).map(item=>({item,x:item.point[0]*width/700,y:item.point[1]*width/700,width:item.button.offsetWidth||44,height:item.button.offsetHeight||44}));
    const positions=separate(points,width);
    positions.forEach(p=>{p.item.button.style.left=p.x/width*100+'%';p.item.button.style.top=p.y/width*100+'%';});
  }
  function controls({surface,container,getView,setView,stopAnimation,min=305,max=2440}){
    const pointers=new Map();let gesture=null,suppressUntil=0;
    function stop(){stopAnimation();}
    function sync(){}
    function begin(){
      const values=[...pointers.values()],view=getView();
      if(!values.length){gesture=null;surface.classList.remove('dragging');return;}
      const center=values.length>1?{x:(values[0].x+values[1].x)/2,y:(values[0].y+values[1].y)/2}:values[0];
      gesture={center,rotation:view.rotation.slice(),scale:view.scale,distance:values.length>1?Math.hypot(values[0].x-values[1].x,values[0].y-values[1].y):0,moved:false};
    }
    surface.addEventListener('pointerdown',event=>{
      if(event.pointerType==='mouse'&&event.button!==0)return;
      if(event.target.closest('button'))return;
      stop();pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});surface.setPointerCapture(event.pointerId);surface.classList.add('dragging');begin();
    });
    surface.addEventListener('pointermove',event=>{
      if(!pointers.has(event.pointerId)||!gesture)return;
      pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const values=[...pointers.values()];
      const center=values.length>1?{x:(values[0].x+values[1].x)/2,y:(values[0].y+values[1].y)/2}:values[0];
      const dx=center.x-gesture.center.x,dy=center.y-gesture.center.y;
      if(event.pointerType==='touch'&&values.length===1&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>4)return;
      const distance=values.length>1?Math.hypot(values[0].x-values[1].x,values[0].y-values[1].y):0;
      const scale=min;
      if(values.length>1)return;
      if(Math.hypot(dx,dy)>4||Math.abs(scale-gesture.scale)>2)gesture.moved=true;
      if(gesture.moved)suppressUntil=performance.now()+350;
      const sensitivity=180/surface.clientWidth*(min/scale);
      setView({rotation:[gesture.rotation[0]+dx*sensitivity,clamp(gesture.rotation[1]-dy*sensitivity,-85,85),0],scale});
    });
    function end(event){if(!pointers.has(event.pointerId))return;if(gesture?.moved)suppressUntil=performance.now()+350;pointers.delete(event.pointerId);begin();}
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>surface.addEventListener(type,end));
    surface.addEventListener('click',event=>{if(performance.now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation();}},true);
    surface.addEventListener('keydown',event=>{
      if(event.target!==surface)return;
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
      event.preventDefault();stop();const view=getView(),r=view.rotation.slice(),step=12*min/view.scale;
      if(event.key==='ArrowLeft')r[0]-=step;if(event.key==='ArrowRight')r[0]+=step;if(event.key==='ArrowUp')r[1]+=step;if(event.key==='ArrowDown')r[1]-=step;r[1]=clamp(r[1],-85,85);setView({rotation:r,scale:view.scale});
    });
    new ResizeObserver(()=>setView(getView())).observe(surface);
    sync();return {sync,stop};
  }
  window.LPGlobe={controls,markerLayout,separate,cluster};
})();
