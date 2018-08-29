function buildLibrary([String] $libraryName) {
    Write-Host 'Building' $libraryName
    npm run ng build --prod $libraryName # https://github.com/angular/angular-cli/issues/5955
    Write-Host 'Builded' $libraryName
}
function packLibrary([String] $libraryName) {
    # Navigate to the dist Path
    $originalPath = $PSScriptRoot
    $distPath = getDistPathForLibrary($libraryName)

    $relativeDistPath = ($originalPath + '../' + $distPath)
    Set-Location $relativeDistPath

    # Pack the Library
    npm pack

    # get the Targz and publish it
    $targzFile = Get-ChildItem -File *.tgz
    npm publish $targzFile --access public

    # Back to the original Path
    Set-Location $originalPath
}

# ------------ Core Start
function getModuleFile([string]$fileName, [string]$subPath = "Common") {
  $filePath = $PSScriptRoot
  $filePath = Split-Path -Path $filePath -Parent
  $fileName = $($filePath + "/" + $subPath + "/" + $fileName + ".psm1")
  return $fileName
}
function loadModules() {
  Import-Module $($PSScriptRoot + "/Utils.psm1") -Force -Verbose
}
# ------------ Core End

loadModules

$libraryNames = getLibraryNames

foreach($libraryName in $libraryNames)
{
    buildLibrary($libraryName)
    packLibrary($libraryName)
}
