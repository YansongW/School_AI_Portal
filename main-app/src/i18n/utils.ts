export const switchLanguage = (lang: 'zh' | 'en') => {
  localStorage.setItem('language', lang);
  window.location.reload();
}; 