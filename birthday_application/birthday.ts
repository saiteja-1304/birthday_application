interface User {
    username: string;
    dob: string;
}

class BirthdayApp {
    private users: User[] = [];

    constructor() {
        this.loadUsers();
        this.addEventListeners();
    }

    private loadUsers() {
        const usersJSON = localStorage.getItem('users');
        if (usersJSON) {
            this.users = JSON.parse(usersJSON);
        }
    }

    private saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    private addEventListeners() {
        const userForm = document.getElementById('userForm') as HTMLFormElement;
        userForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        const monthBtn = document.getElementById('monthBtn') as HTMLButtonElement;
        monthBtn.addEventListener('click', () => this.displayMonthlyBirthdays());

        const yearBtn = document.getElementById('yearBtn') as HTMLButtonElement;
        yearBtn.addEventListener('click', () => this.displayYearlyBirthdays());

        this.displayCurrentBirthdays();
    }

    private handleFormSubmit(e: Event) {
        e.preventDefault();
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const dob = (document.getElementById('dob') as HTMLInputElement).value;

        this.users.push({ username, dob });
        this.saveUsers();
        this.displayCurrentBirthdays();
    }

    private displayCurrentBirthdays() {
        const currentBirthdaysDiv = document.getElementById('currentBirthdays') as HTMLDivElement;
        currentBirthdaysDiv.innerHTML = '';

        const today = new Date().toISOString().slice(5, 10);
        const currentBirthdays = this.users.filter(user => user.dob.slice(5, 10) === today);

        if (currentBirthdays.length > 0) {
            currentBirthdays.forEach(user => {
                const p = document.createElement('p');
                p.textContent = `${user.username} - ${user.dob}`;
                currentBirthdaysDiv.appendChild(p);
            });
        } else {
            currentBirthdaysDiv.textContent = 'No birthdays today.';
        }
    }

    private displayMonthlyBirthdays() {
        const month = (document.getElementById('month') as HTMLInputElement).value;
        const monthlyBirthdaysDiv = document.getElementById('monthlyBirthdays') as HTMLDivElement;
        monthlyBirthdaysDiv.innerHTML = '';

        if (!month) {
            monthlyBirthdaysDiv.textContent = 'Please select a month.';
            return;
        }

        const monthlyBirthdays = this.users.filter(user => user.dob.slice(0, 7) === month);

        if (monthlyBirthdays.length > 0) {
            monthlyBirthdays.forEach(user => {
                const p = document.createElement('p');
                p.textContent = `${user.username} - ${user.dob}`;
                monthlyBirthdaysDiv.appendChild(p);
            });
        } else {
            monthlyBirthdaysDiv.textContent = 'No birthdays in this month.';
        }
    }

    private displayYearlyBirthdays() {
        const year = (document.getElementById('year') as HTMLInputElement).value;
        const yearlyBirthdaysDiv = document.getElementById('yearlyBirthdays') as HTMLDivElement;
        yearlyBirthdaysDiv.innerHTML = '';

        if (!year) {
            yearlyBirthdaysDiv.textContent = 'Please select a year.';
            return;
        }

        const yearlyBirthdays = this.users.filter(user => user.dob.slice(0, 4) === year);

        if (yearlyBirthdays.length > 0) {
            yearlyBirthdays.forEach(user => {
                const p = document.createElement('p');
                p.textContent = `${user.username} - ${user.dob}`;
                yearlyBirthdaysDiv.appendChild(p);
            });
        } else {
            yearlyBirthdaysDiv.textContent = 'No birthdays in this year.';
        }
    }
}

const birthday = new BirthdayApp();
