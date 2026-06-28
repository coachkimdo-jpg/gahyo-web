@echo off
cd /d C:\Users\PC\Desktop\gahyo
IF EXIST .git\index.lock (
    del /f .git\index.lock
    echo Lock removed.
)
git add -A
git commit -m "feat: 전환율 개선 — 하단 고정 CTA 바 추가, consultEnabled 게이트 제거, 다대수병원 제외, 소스맵 비활성화, 애니메이션/색상대비 수정"
git push
echo.
echo === 완료 ===
pause
