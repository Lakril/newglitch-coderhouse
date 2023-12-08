alert('Welcome to Chat development')
const username = prompt('Enter your usernameer')

// @ts-ignore
const socket = io('http://localhost:8080', {
auth: {
    username: 'admin',
}
});