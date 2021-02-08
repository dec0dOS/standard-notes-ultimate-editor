export const base = {
  fontFamily:
        'var(--sn-stylekit-sans-serif-font)',
  fontFamilyMono:
        'var(--sn-stylekit-monospace-font)',
  fontWeight: 400,
  zIndex: 100,
  link: 'var(--sn-stylekit-info-color)',
  placeholder: 'var(--sn-stylekit-input-placeholder-color)',
  textSecondary: '#4E5C6E',
  textLight: 'var(--sn-stylekit-paragraph-text-color)',
  textHighlight: '#ff0',
  selected: 'var(--sn-stylekit-info-color)',
  codeComment: 'var(--sn-stylekit-secondary-foreground-color)',
  codePunctuation: 'var(--sn-stylekit-contrast-backround-color)',
  codeNumber: '#d73a49',
  codeProperty: '#c08b30',
  codeTag: '#3d8fd1',
  codeString: 'var(--sn-stylekit-success-color)',
  codeSelector: '#6679cc',
  codeAttr: '#c76b29',
  codeEntity: '#22a2c9',
  codeKeyword: 'var(--sn-stylekit-info-color)',
  codeFunction: '#6f42c1',
  codeStatement: '#22a2c9',
  codePlaceholder: '#3d8fd1',
  codeInserted: '#202746',
  codeImportant: '#c94922',

  blockToolbarBackground: 'var(--sn-stylekit-contrast-background-color)',
  blockToolbarTrigger: 'var(--sn-stylekit-info-color)',
  blockToolbarTriggerIcon: 'var(--sn-stylekit-paragraph-text-color)',
  blockToolbarItem: 'var(--sn-stylekit-paragraph-text-color)',
  blockToolbarText: 'var(--sn-stylekit-paragraph-text-color)',
  blockToolbarHoverBackground: 'var(--sn-stylekit-neutral-contrast-color)',
  blockToolbarDivider: 'var(--sn-stylekit-paragraph-text-color)',

  noticeInfoBackground: 'var(--sn-stylekit-info-color)',
  noticeInfoText: 'var(--sn-stylekit-info-contrast-color)',
  noticeTipBackground: 'var(--sn-stylekit-success-color)',
  noticeTipText: 'var(--sn-stylekit-success-contrast-color)',
  noticeWarningBackground: 'var(--sn-stylekit-warning-color)',
  noticeWarningText: 'var(--sn-stylekit-warning-contrast-color)'
}

export const light = {
  ...base,
  background: 'transparent',
  text: 'var(--sn-stylekit-paragraph-text-color)',
  code: 'var(--sn-stylekit-secondary-foreground-color)',
  cursor: 'var(--sn-stylekit-contrast-foreground-color)',
  divider: 'var(--sn-stylekit--secondary-contrast-border-color)',

  toolbarBackground: 'var(--sn-stylekit-secondary-background-color)',
  toolbarInput: 'var(--sn-stylekit-secondary-background-color)',
  toolbarItem: 'var(--sn-stylekit-paragraph-text-color)',

  tableDivider: 'var(--sn-stylekit-secondary-foreground-color)',
  tableSelected: 'var(--sn-stylekit-secondary-foreground-color)',
  tableSelectedBackground: 'var(--sn-stylekit-contrast-background-color)',

  quote: 'var(--sn-stylekit-secondary-foreground-color)',
  codeBackground: 'var(--sn-stylekit-secondary-background-color)',
  codeBorder: 'var(--sn-stylekit-secondary-foreground-color)',
  horizontalRule: 'var(--sn-stylekit-input-placeholder-color)',
  imageErrorBackground: 'var(--sn-stylekit-neutral-color)'
}

export default light
