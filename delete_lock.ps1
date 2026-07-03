Remove-Item "C:\Users\PC\Desktop\gahyo\.git\index.lock" -Force
Write-Host "Lock removed. Running git commit..."
Set-Location "C:\Users\PC\Desktop\gahyo"
git commit -m "perf: 성능 개선 — 소스맵 비활성화, 비합성 애니메이션 수정, 색상대비 수정"
git push
Write-Host "Done!"
pause
