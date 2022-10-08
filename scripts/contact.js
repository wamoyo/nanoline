!(function () {
  "use strict"
  window.addEventListener('load', function (event) {

    var form = document.getElementById('contact')
    var fieldset = form.querySelector('fieldset')
    var name = document.getElementById('name')
    var mail = document.getElementById('mail')
    var message = document.getElementById('message')
    var formStatus = document.getElementById('form-status')
    var submit = document.getElementById('submit')
    var submitOriginalValue = submit.value
    var statusCode

    // Enabled form
    fieldset.removeAttribute('disabled')

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()

        name.setAttribute('disabled', 'disabled')
        mail.setAttribute('disabled', 'disabled')
        message.setAttribute('disabled', 'disabled')
        submit.setAttribute('disabled', 'disabled')
        submit.value = "Processing..."

        var email = mail.value || ''

        fetch('https://y1omagzluc.execute-api.us-east-1.amazonaws.com/contact-api-nanoline', {
          method: 'POST',
          body: JSON.stringify({
            contact: {
              person: name.value || '',
              email: mail.value || '',
              message: message.value || ''
            }
          }),
          headers: {
            'Content-type': 'application/json'
          }
        }).then(function(response) {
          console.log('Response: ', response)
          statusCode = response.status
          return response.json()
        }).then(function(json) {
          console.log('JSON: ', json)
          if (statusCode == 200) return success(json.message)
          if (statusCode == 400) return badRequest(json.error)
          return errorOut(json.error)
        }).catch(function (error) {
          console.error(error)
          return errorOut(email)
        })
      })

      function success (status) {
        console.log(status)
        formStatus.classList.remove('fail')
        formStatus.classList.add('success')
        name.value = ''
        mail.value = ''
        message.value = ''
        setTimeout(function () {
          formStatus.textContent = status
        }, 100)
        name.removeAttribute('disabled')
        mail.removeAttribute('disabled')
        message.removeAttribute('disabled')
        submit.removeAttribute('disabled')
        submit.value = submitOriginalValue
      }

      function badRequest (email) {
        var status = 'Contact failed, please reach out to Costa Michailidis directly at costa@carbonnanotubes.org for help.'
        console.log(status)
        formStatus.classList.remove('success')
        formStatus.classList.add('fail')
        formStatus.textContent = message
        name.removeAttribute('disabled')
        mail.removeAttribute('disabled')
        message.removeAttribute('disabled')
        submit.removeAttribute('disabled')
        submit.value = submitOriginalValue
      }

      function errorOut (email) {
        var status = 'Contact failed, please reach out to Costa Michailidis directly at costa@carbonnanotubes.org for help.'
        console.log(status)
        formStatus.classList.remove('success')
        formStatus.classList.add('fail')
        formStatus.textContent = status
        name.removeAttribute('disabled')
        mail.removeAttribute('disabled')
        message.removeAttribute('disabled')
        submit.removeAttribute('disabled')
        submit.value = submitOriginalValue
      }
    }

  })
}());
