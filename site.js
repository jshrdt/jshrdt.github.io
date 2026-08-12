document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var updatedEl = document.getElementById('last-updated');
  if (updatedEl) {
    var path = window.location.pathname.replace(/^\//, '') || 'index.html';
    fetch('https://api.github.com/repos/jshrdt/jshrdt.github.io/commits?path=' + encodeURIComponent(path) + '&per_page=1')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (commits) {
        if (!commits || !commits[0]) return;
        var d = new Date(commits[0].commit.committer.date);
        updatedEl.textContent = d.toLocaleDateString('en-GB', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
      })
      .catch(function () { /* leave fallback text in place */ });
  }
});
