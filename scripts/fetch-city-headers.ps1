$ErrorActionPreference='Stop'
$cities=@{mendoza='Mendoza, Argentina';lujan='Luján de Cuyo';potrerillos='Potrerillos, Mendoza';aconcagua='Aconcagua';bariloche='Bariloche';santiago='Santiago';vina='Viña del Mar';lapaz='La Paz';sucre='Sucre';maipo='Maipo Valley';potosi='Potosí';santacruz='Santa Cruz de la Sierra';uyuni='Uyuni';coroico='Coroico';cochabamba='Cochabamba';puertomontt='Puerto Montt';frutillar='Frutillar';puertovaras='Puerto Varas';osorno='Osorno, Chile'}
New-Item -ItemType Directory -Force assets/city-headers | Out-Null
$photos=@{}
if(Test-Path assets/city-headers/credits.json){$existing=Get-Content assets/city-headers/credits.json -Raw -Encoding UTF8 | ConvertFrom-Json;foreach($prop in $existing.PSObject.Properties){$photos[$prop.Name]=$prop.Value}}
foreach($key in $cities.Keys){
 if($photos.ContainsKey($key)){continue}
 Start-Sleep -Seconds 3
 try {
 $meta=Invoke-RestMethod -TimeoutSec 20 -Uri ('https://en.wikipedia.org/api/rest_v1/page/summary/'+[uri]::EscapeDataString($cities[$key]))
 if(!$meta.thumbnail.source){Write-Output "Missing photo: $key";continue}
 $url=($meta.thumbnail.source -split '\?')[0] -replace '/\d+px-','/960px-'
 $file=[uri]::UnescapeDataString(($url -split '/')[-2])
 $info=Invoke-RestMethod -TimeoutSec 20 -Uri ('https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&format=json&titles='+[uri]::EscapeDataString('File:'+$file))
 $credit=($info.query.pages.PSObject.Properties.Value | Select-Object -First 1).imageinfo[0].extmetadata
 $ext=[IO.Path]::GetExtension(($url -split '/')[-1]);if($ext -notmatch '^\.(jpg|jpeg|png|webp)$'){$ext='.jpg'}
 $path='assets/city-headers/'+$key+$ext
 Invoke-WebRequest -UseBasicParsing -TimeoutSec 25 -Uri $url -OutFile $path
 $photos[$key]=@{src=$path;title=$cities[$key];author=($credit.Artist.value -replace '<[^>]+>','');license=$credit.LicenseShortName.value;licenseUrl=$credit.LicenseUrl.value;source='https://commons.wikimedia.org/wiki/File:'+[uri]::EscapeDataString($file)}
 Write-Output "Downloaded $key"
 }catch{Write-Output ($key+': '+$_.Exception.Message)}
}
$json=$photos | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText((Join-Path (Get-Location) 'assets/city-headers/credits.json'),$json,(New-Object Text.UTF8Encoding $false))
