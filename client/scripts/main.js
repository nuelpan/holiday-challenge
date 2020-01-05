$(document).ready(function() {
  if (localStorage.getItem('token')) {
    isLogin(true)
    getContacts()
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
      getContacts()
      isLogin(true)
    })
    .fail(({ responseJSON }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
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
      getContacts()
      isLogin(true)
    })
    .fail(({ responseJSON }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
    })
  })

  $('#addContact-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      url: 'contact',
      method: 'POST',
      data: {
        name: $('#new-name').val(),
        phone: $('#new-phone').val()
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(data => {
      getContacts()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Contact has been saved'
      })
      $('#addContact').modal('toggle') 
    })
    .fail(({ responseJSON }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
    })
  })

  $('#editContact-form').on('submit', function(e) {
    e.preventDefault()
    let id = $('#contactId').val()
    console.log(id)
    $.ajax({
      url: `contact/${id}`,
      method: 'PUT',
      data: {
        name: $('#name').val(),
        phone: $('#phone').val()
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(data => {
      getContacts()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Contact has been updated'
      })
      $('#editContact').modal('toggle') 
    })
    .fail(({ responseJSON }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
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
function getContacts() {
  $.ajax({
    url: 'contact',
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(({contacts}) => {
      if (contacts.length < 1) {
        $("#contact-table").find('tbody').empty()
        $("#contact-table").css({'display': 'none'})
      } else {
        $("#contact-table").find('tbody').empty()
        $("#contact-table").css({'display': 'block'})
        contacts.forEach(contact => {
          $("#contact-table").find('tbody').append(`
            <tr>
              <td>${contact.name}</td>
              <td>${contact.phone}</td>
              <td><button class="btn btn-warning" onClick="editContact(${contact.id})">edit</button> <button class="btn btn-danger" onClick="deleteContact(${contact.id})">delete</button></td>
            </tr>
          `)
        });
      }
    })
    .fail(({ responseJSON }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
    })
}

function editContact(id) {
  $.ajax({
    url: `contact/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(({ contact }) => {
      $('#editContact').modal('toggle')
      $('#name').val(contact.name)
      $('#phone').val(contact.phone)
      $('#contactId').val(id)   
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: responseJSON.message
      })
    })
}

function deleteContact(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.showLoading() 
      $.ajax({
        url: `contact/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .done(data => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          getContacts()
        })
        .fail(({ responseJSON }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: responseJSON.message
          })
        })
    }
  })
  
}