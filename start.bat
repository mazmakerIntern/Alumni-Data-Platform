@echo off
REM Alumni Data Platform - local preview server
echo ==========================================
echo  Alumni Data Platform - Local Preview
echo  Open: http://localhost:5173
echo  Press Ctrl+C to stop
echo ==========================================
cd /d "%~dp0"
python -m http.server 5173
