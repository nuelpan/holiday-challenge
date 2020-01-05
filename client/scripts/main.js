$(document).ready(function() {
  if (localStorage.getItem('token')) {
    isLogin(true)
  } else {
    isLogin(false)
  }

  $('#link-login').on('click', function(e) {
    e.preventDefault()
    $('#home-wrapper').css({'display': 'none'})
    $('#login-wrapper').css({'display': 'block'})
    $('#register-wrapper').css({'display': 'none'})
  })
  $('#link-logout').on('click', function(e) {
    e.preventDefault()
    localStorage.clear()
    isLogin(false)
  })
  $('#link-register').on('click', function(e) {
    e.preventDefault()
    $('#home-wrapper').css({'display': 'none'})
    $('#login-wrapper').css({'display': 'none'})
    $('#register-wrapper').css({'display': 'block'})
  })

  $('#register-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      url: 'register',
      method: 'POST',
      data: {
        email: $('#new-email').val(),
        password: $('#new-password').val()
      }
    })
    .done(data => {
      localStorage.setItem('token', data.token)
      isLogin(true)
    })
    .fail(({ responseJSON }) => {
      console.log(responseJSON.message)
    })
  })

  $('#login-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      url: 'login',
      method: 'POST',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    })
    .done(data => {
      localStorage.setItem('token', data.token)
      isLogin(true)
    })
    .fail(({ responseJSON }) => {
      console.log(responseJSON.message)
    })
  })
})
function isLogin(status) {
  if (status) {
    $('#home-wrapper').css({'display': 'block'})
    $('#login-wrapper').css({'display': 'none'})
    $('#register-wrapper').css({'display': 'none'})
  } else {
    $('#home-wrapper').css({'display': 'none'})
    $('#login-wrapper').css({'display': 'block'})
    $('#register-wrapper').css({'display': 'none'})
  }
  $('#email').val('')
  $('#password').val('')
  $('#new-email').val('')
  $('#new-password').val('')
}