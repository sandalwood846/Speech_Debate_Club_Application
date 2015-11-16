Template.signup.events({
  'submit form': function(e){
    // Prevent form from submitting.
    e.preventDefault();

    var error = false;

    //// Grab the student's details.
    var student = {
      firstName: $('[name="firstName"]').val(),
      middleName: $('[name="middleName"]').val(),
      lastName: $('[name="lastName"]').val(),
      DOB: $('[name="DOB"]').val(),
      studentGrade: $('[name="studentGrade"]').val(),
      emailAddress: $('[name="emailAddress"]').val(),
      password: $('[name="password"]').val(),
      studentPhoneNo: $('[name="studentPhoneNo"]').val(),
      studentId: $('[name="studentId"]').val(),
      facebookAccount: $('[name="facebookAccount"]').val(),
      facebookEvsd: $('[name="facebookEvsd"]').val(),
      schoolloopEvsd: $('[name="schoolloopEvsd"]').val()
    };
    var parent = {
        firstParent: $('[name="firstParent"]').val(),
        firstParentPhoneNo: $('[name="firstParentPhoneNo"]').val(),
        firstParentEmailAddress: $('[name="firstParentEmailAddress"]').val(),
        firstParentEmployer: $('[name="firstParentEmployer"]').val(),
        secondParent: $('[name="secondParent"]').val(),
        secondParentPhoneNo: $('[name="secondParentPhoneNo"]').val(),
        secondParentEmailAddress: $('[name="secondParentEmailAddress"]').val(),
        secondParentEmployer: $('[name="secondParentEmployer"]').val()
    };
    var misc = {
        findOut: $('[name="findOut"]').val(),
        whyjoin: $('[name="whyjoin"]').val(),
        concerns: $('[name="concerns"]').val()
    };

    // Get the values:
    var ccNum = $('[data-stripe="cardNumber"]').val(),
        cvcNum =$('[data-stripe="cvc"]').val(),
        expMonth = $('[data-stripe="expMo"]').val(),
        expYear = $('[data-stripe="expYr"]').val(),
        name = $('[data-stripe="cardholder_name"]').val(),
        address_line1 = $('[data-stripe="address_line1"]').val(),
        address_line2 = $('[data-stripe="address_line2"]').val(),
        address_city = $('[data-stripe="address_city"]').val(),
        address_state = $('[data-stripe="address_state"]').val(),
        address_zip = $('[data-stripe="address_zip"]').val(),
        address_country = $('[data-stripe="address_country"]').val();

      if ((ccNum == null || ccNum == "") && (cvcNum == null || cvcNum == "") && (expMonth == null || expMonth == "") && (expYear == null || expYear == "") && (name == null || name == "") && (address_line1 == null || address_line1 == "")
          && (address_line2 == null || address_line2 == "") && (address_city == null || address_city == "") && (address_state == null || address_state == "") && (address_zip == null || address_zip == "") && (address_country == null || address_country == "")) {

            error = true;

          var name = $('[name="firstName"]').val(),
              emailAddress = $('[name="emailAddress"]').val(),
              password = $('[name="password"]').val();

        Meteor.call('createreguser', student, parent, misc, function(err,res) {
            if (err){
              console.log('reg user error');
            } else {
              Router.go('/success');
            }

        });
      }
    // Validate the number

    if (!Stripe.card.validateCardNumber(ccNum)) {
        error = true;
        INPUTERROR.report('The credit card number appears to be invalid.');
    }

    // Validate the CVC:
    if (!Stripe.card.validateCVC(cvcNum)) {
        error = true;
        INPUTERROR.report('The CVC number appears to be invalid.');
    }

    // Validate the expiration:
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
        error = true;
        INPUTERROR.report('The expiration date appears to be invalid.');
    }
       // Take our card data and create a Stripe token from the client. This
       // ensures that our code is PCI compliant to keep the man from knocking
       // on our door.
      if (!error) {
       STRIPE.getToken( '#application-signup', {
         number: $('[data-stripe="cardNumber"]').val(),
         exp_month: $('[data-stripe="expMo"]').val(),
         exp_year: $('[data-stripe="expYr"]').val(),
         cvc: $('[data-stripe="cvc"]').val(),
         name: $('[data-stripe="cardholder_name"]').val(),
         address_line1: $('[data-stripe="address_line1"]').val(),
         address_line2: $('[data-stripe="address_line2"]').val(),
         address_city: $('[data-stripe="address_city"]').val(),
         address_state: $('[data-stripe="address_state"]').val(),
         address_zip: $('[data-stripe="address_zip"]').val(),
         address_country: $('[data-stripe="address_country"]').val()
       }, function() {

         // Grab the customer's details.
         var token = {
           token: $('[name="stripeToken"]').val()
         };

        //var submitButton = $('input[type="submit"]').button('loading');
        console.log("test");
         Meteor.call('createCustomer', student, parent, misc, token, function(err, response){

           if (err) {
             //INPUTERROR.report('There was a problem with your signup. Please try again');
             alert(error.reason);
             console.log("alert error");
             // If creation fails, make sure to "reset" our signup interface.
             //submitButton.button('reset');
             //Router.go('error')
           } else {
             console.log("no error");
            //Router.go('/');
             // Note: because we're using a Future to return a value, even if an error
             // occurs on the server, it will be passed back to the client as the
             // response argument. Here, we test to make sure we didn't receive an error
             // in our response before continuing.
             if ( response.error ) {
               alert(response.message);
               console.log("alert response message");
               Router.go('error')
               // If creation fails, make sure to "reset" our signup interface.
                //submitButton.button('reset');
             } else {
               // Our user exists, so now we can log them in! Note: because we know
               // that we created our user using the emailAddress and password values
               // above, we can simply login with these Hot dog, indeed.
               Router.go('/success');
               console.log("login with password");
              /* Meteor.loginWithPassword(customer.emailAddress, customer.password, function(error){
                 if (error) {
                   alert(error.reason);
                   // If login fails, make sure to "reset" our signup interface.
                   //submitButton.button('reset');
                 } else {
                  // Router.go('/');
                   // If creation fails, make sure to "reset" our signup interface.
                   submitButton.button('reset');
                 }
               });*/
             }
           }
         });

       });
     } // end STRIPE.getToken();

  }
});
