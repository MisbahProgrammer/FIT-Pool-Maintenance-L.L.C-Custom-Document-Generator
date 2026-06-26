@echo off
title Fit Pool Document Automation Launcher
echo =======================================================
echo     STARTING FIT POOL DOCUMENT AUTOMATION WEB APP
echo =======================================================
echo.
echo Launching your web browser at http://127.0.0.1:5000...
start "" "http://127.0.0.1:5000"
echo.
echo Starting the Flask backend server. Keep this window open...
echo.
call .venv\Scripts\python.exe app.py
pause
