!macro customHeader
!macroend

!macro preInit
!macroend

!macro customInit
!macroend

!macro customInstall
  CreateShortcut "$DESKTOP\Moopon.lnk" "$INSTDIR\Moopon.exe" "" "$INSTDIR\Moopon.exe" 0
  CreateShortcut "$SMPROGRAMS\Moopon\Moopon.lnk" "$INSTDIR\Moopon.exe" "" "$INSTDIR\Moopon.exe" 0
  CreateShortcut "$SMPROGRAMS\Moopon\Uninstall Moopon.lnk" "$INSTDIR\Uninstall Moopon.exe"
!macroend

!macro customUnInstall
  Delete "$DESKTOP\Moopon.lnk"
  Delete "$SMPROGRAMS\Moopon\Moopon.lnk"
  Delete "$SMPROGRAMS\Moopon\Uninstall Moopon.lnk"
  RMDir "$SMPROGRAMS\Moopon"
!macroend

!macro customInstallMode
  !define instMode "currentUser"
!macroend
