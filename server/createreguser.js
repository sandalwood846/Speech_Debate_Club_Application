Meteor.methods ({
  createreguser : function (student, parent, misc) {

    //check(name, String);
    //check(emailAddress, String)
    //check (password, String);

    check(student, {
      firstName: String,
      middleName: String,
      lastName: String,
      DOB: String,
      studentGrade: String,
      emailAddress: String,
      password: String,
      studentPhoneNo: String,
      studentId: String,
      facebookAccount: String,
      facebookEvsd: String,
      schoolloopEvsd: String
    });

    check(parent, {
      firstParent: String,
      firstParentPhoneNo: String,
      firstParentEmailAddress: String,
      firstParentEmployer: String,
      secondParent: String,
      secondParentPhoneNo: String,
      secondParentEmailAddress: String,
      secondParentEmployer: String
    });
    check(misc, {
        findOut: String,
        whyjoin: String,
        concerns: String
    });

    var username = student.emailAddress;
    var email = student.emailAddress;
    var password = student.password;

    var user = Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        DOB: student.DOB,
        studentGrade: student.studentGrade,
        studentPhoneNo: student.studentPhoneNo,
        studentId: student.studentId,
        facebookAccount: student.facebookAccount,
        facebookEvsd: student.facebookEvsd,
        schoolloopEvsd: student.schoolloopEvsd,
        firstParent: parent.firstParent,
        firstParentPhoneNo: parent.firstParentPhoneNo,
        firstParentEmailAddress: parent.firstParentEmailAddress,
        firstParentEmployer: parent.firstParentEmployer,
        secondParent: parent.secondParent,
        secondParentPhoneNo: parent.secondParentPhoneNo,
        secondParentEmailAddress: parent.secondParentEmailAddress,
        secondParentEmployer: parent.secondParentEmployer,
        findOut: misc.findOut,
        whyjoin: misc.whyjoin,
        concerns: misc.concerns,
        stripeId: "Null",
        Donation: "free"
      }
    });
  }
});
