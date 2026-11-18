// JavaScript source code
 
/**
   * Web3Forms Custom Contact Form Handler (Silences template's PHP error box)
   */
  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const thisForm = this;
      const action = thisForm.getAttribute('action');
      
      if (!action) {
        return;
      }

      const loadingEl = thisForm.querySelector('.loading');
      const errorEl = thisForm.querySelector('.error-message');
      const successEl = thisForm.querySelector('.sent-message');

      if (loadingEl) loadingEl.classList.add('d-block');
      if (errorEl) {
        errorEl.classList.remove('d-block');
        errorEl.style.display = 'none';
        errorEl.innerHTML = '';
      }
      if (successEl) successEl.classList.remove('d-block');

      const formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (loadingEl) loadingEl.classList.remove('d-block');
        
        // Force error box to stay hidden and cleared
        if (errorEl) {
          errorEl.style.display = 'none';
          errorEl.innerHTML = '';
        }

        if (data.success) {
          if (successEl) successEl.classList.add('d-block');
          thisForm.reset();
        } else {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.innerHTML = data.message || 'Submission failed';
            errorEl.classList.add('d-block');
          }
        }
      })
      .catch((error) => {
        if (loadingEl) loadingEl.classList.remove('d-block');
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.innerHTML = 'An unexpected network error occurred.';
          errorEl.classList.add('d-block');
        }
      });
    });
  });

})();
