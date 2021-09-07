export default function Users(req, res) {

    const users = [{'email': 'test@test.com', 'uid': 'zVNxn0tK9cdtoFKcJ98zBdsefL23'},{'email': 'pepito@test.com', 'uid': 'zVNxn0tK9cdtoFKcJ98zBdsefL24'},{'email': 'pablito@test.com', 'uid': 'zVNxn0tK9cdtoFKcJ98zBdsefL25'}]

    res.status(200).json(users)
}