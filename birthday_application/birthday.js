var BirthdayApp = /** @class */ (function () {
    function BirthdayApp() {
        this.users = [];
        this.loadUsers();
        this.addEventListeners();
    }
    BirthdayApp.prototype.loadUsers = function () {
        var usersJSON = localStorage.getItem('users');
        if (usersJSON) {
            this.users = JSON.parse(usersJSON);
        }
    };
    BirthdayApp.prototype.saveUsers = function () {
        localStorage.setItem('users', JSON.stringify(this.users));
    };
    BirthdayApp.prototype.addEventListeners = function () {
        var _this = this;
        var userForm = document.getElementById('userForm');
        userForm.addEventListener('submit', function (e) { return _this.handleFormSubmit(e); });
        var monthBtn = document.getElementById('monthBtn');
        monthBtn.addEventListener('click', function () { return _this.displayMonthlyBirthdays(); });
        var yearBtn = document.getElementById('yearBtn');
        yearBtn.addEventListener('click', function () { return _this.displayYearlyBirthdays(); });
        this.displayCurrentBirthdays();
    };
    BirthdayApp.prototype.handleFormSubmit = function (e) {
        e.preventDefault();
        var username = document.getElementById('username').value;
        var dob = document.getElementById('dob').value;
        this.users.push({ username: username, dob: dob });
        this.saveUsers();
        this.displayCurrentBirthdays();
    };
    BirthdayApp.prototype.displayCurrentBirthdays = function () {
        var currentBirthdaysDiv = document.getElementById('currentBirthdays');
        currentBirthdaysDiv.innerHTML = '';
        var today = new Date().toISOString().slice(5, 10);
        var currentBirthdays = this.users.filter(function (user) { return user.dob.slice(5, 10) === today; });
        if (currentBirthdays.length > 0) {
            currentBirthdays.forEach(function (user) {
                var p = document.createElement('p');
                p.textContent = "".concat(user.username, " - ").concat(user.dob);
                currentBirthdaysDiv.appendChild(p);
            });
        }
        else {
            currentBirthdaysDiv.textContent = 'No birthdays today.';
        }
    };
    BirthdayApp.prototype.displayMonthlyBirthdays = function () {
        var month = document.getElementById('month').value;
        var monthlyBirthdaysDiv = document.getElementById('monthlyBirthdays');
        monthlyBirthdaysDiv.innerHTML = '';
        if (!month) {
            monthlyBirthdaysDiv.textContent = 'Please select a month.';
            return;
        }
        var monthlyBirthdays = this.users.filter(function (user) { return user.dob.slice(0, 7) === month; });
        if (monthlyBirthdays.length > 0) {
            monthlyBirthdays.forEach(function (user) {
                var p = document.createElement('p');
                p.textContent = "".concat(user.username, " - ").concat(user.dob);
                monthlyBirthdaysDiv.appendChild(p);
            });
        }
        else {
            monthlyBirthdaysDiv.textContent = 'No birthdays in this month.';
        }
    };
    BirthdayApp.prototype.displayYearlyBirthdays = function () {
        var year = document.getElementById('year').value;
        var yearlyBirthdaysDiv = document.getElementById('yearlyBirthdays');
        yearlyBirthdaysDiv.innerHTML = '';
        if (!year) {
            yearlyBirthdaysDiv.textContent = 'Please select a year.';
            return;
        }
        var yearlyBirthdays = this.users.filter(function (user) { return user.dob.slice(0, 4) === year; });
        if (yearlyBirthdays.length > 0) {
            yearlyBirthdays.forEach(function (user) {
                var p = document.createElement('p');
                p.textContent = "".concat(user.username, " - ").concat(user.dob);
                yearlyBirthdaysDiv.appendChild(p);
            });
        }
        else {
            yearlyBirthdaysDiv.textContent = 'No birthdays in this year.';
        }
    };
    return BirthdayApp;
}());
var birthday = new BirthdayApp();
