$lines = [System.IO.File]::ReadAllLines("$PWD\okr-builder.html")
$inScript = $false
$depth = 0
$scriptNum = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '<script') { $inScript = $true; $scriptNum++; continue }
    if ($line -match '</script') { $inScript = $false; continue }
    if (-not $inScript) { continue }
    if ($scriptNum -lt 2) { continue }
    foreach ($ch in $line.ToCharArray()) {
        if ($ch -eq [char]'{') { $depth++ }
        elseif ($ch -eq [char]'}') { $depth-- }
    }
    if ($depth -lt 0) {
        Write-Host "EXTRA CLOSE at line $($i+1): depth=$depth"
        Write-Host "  $line"
    }
}
Write-Host "Final brace depth: $depth (should be 0)"
if ($depth -gt 0) {
    Write-Host "Missing $depth closing brace(s)"
    Write-Host "Scanning backwards for last high-depth point..."
    $depth2 = 0
    $lastPositive = @()
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        if ($line -match '<script' -and $scriptNum -ge 2) { continue }
        if ($line -match '</script') { continue }
        $prevDepth = $depth2
        foreach ($ch in $line.ToCharArray()) {
            if ($ch -eq [char]'{') { $depth2++ }
            elseif ($ch -eq [char]'}') { $depth2-- }
        }
        if ($depth2 -gt $prevDepth -and $i -gt 1800) {
            $lastPositive += "Line $($i+1) depth $prevDepth->$depth2 : $($line.Substring(0, [Math]::Min(100, $line.Length)))"
        }
    }
    $lastPositive | Select-Object -Last 20 | ForEach-Object { Write-Host $_ }
}
