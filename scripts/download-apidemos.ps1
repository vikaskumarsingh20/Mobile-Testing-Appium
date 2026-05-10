$ErrorActionPreference = "Stop"

$appsDir = Join-Path $PSScriptRoot "..\\apps"
New-Item -ItemType Directory -Force -Path $appsDir | Out-Null

$release = Invoke-RestMethod -Uri "https://api.github.com/repos/appium/android-apidemos/releases/latest"
$apk = $release.assets | Where-Object { $_.name -eq "ApiDemos-debug.apk" } | Select-Object -First 1

if (-not $apk) {
    throw "Could not find ApiDemos-debug.apk in the latest android-apidemos release."
}

$target = Join-Path $appsDir $apk.name
Invoke-WebRequest -Uri $apk.browser_download_url -OutFile $target
Write-Host "Downloaded $($apk.name) to $target"
