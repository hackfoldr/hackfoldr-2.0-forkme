i18next
  .use(i18nextXHRBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'zh',
    whitelist: ['en', 'zh'],
    debug: true,
    backend: {
      loadPath: 'https://gist.githubusercontent.com/patcon/1f68d3efd30360048bce81b3a7655c5b/raw/{{lng}}.json',
      crossDomain: true
    }
  }, function(err, t) {
    translations = [
      'x-expand',
      'x-collapse',
      'x-recent',
      'x-zoom',
      'x-help',
      'add',
      'edit',
      'update'
    ]
    translations.forEach(function (key) {
      if (key.startsWith('x-')) {
        key = key.substring(2)
        document.getElementById('desktop-'+key).setAttribute("data-content", i18next.t('index.'+key))
        document.getElementById('mobile-'+key).setAttribute("data-content", i18next.t('index.'+key))
      } else {
        document.getElementById(key).setAttribute("data-content", i18next.t('index.'+key))
      }
    });
    document.querySelector('[for=add-only]').innerHTML = i18next.t('index.add-link');
    document.querySelector('[for=create-add]').innerHTML = i18next.t('index.create-add-hackpad');
    document.querySelector('[name=new-link-title]').setAttribute('placeholder', i18next.t('index.link-name'));
    document.querySelector('[name=new-link-url]').setAttribute('placeholder', i18next.t('index.link-url'));
    document.querySelector('[name=new-pad-name]').setAttribute('placeholder', i18next.t('index.hackpad-name'));
  });
