class UserController {
    create (req, res) {
        res.send("UserController CREATE");
    } 

    read (req, res) {
        res.send("UserController READ");
    }

    findById (req, res) {
        res.send("UserController findID");
    }

    update (req, res) {
        res.send("UserController UPDATE");
    }

    delete (req, res) {
        res.send("UserController DELETE");
    }
}

export default UserController;