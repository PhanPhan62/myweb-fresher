const db = require('../connection');
const jwt = require('jsonwebtoken');
exports.getNewProduct = (req, res) => {

    db.query('CALL getAllNewProduct', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }

    });
};
exports.getNewProduct3 = (req, res) => {

    db.query('CALL getAllNewProduct3', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }

    });
};
exports.getAllBestSeller = (req, res) => {

    db.query('CALL getAllBestSeller', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }

    });
};
exports.getAllBestSeller3 = (req, res) => {

    db.query('CALL getAllBestSeller3', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }

    });
};
exports.getAllSell = (req, res) => {

    db.query('CALL getAllSell', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }

    });
};
exports.getAllSell3 = (req, res) => {

    db.query('CALL getAllSell3', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }
    });
};
exports.getByIdProduct = (req, res) => {

    const id = req.params.id;
    db.query('CALL getByIdProduct(?)', [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }
    });
};
exports.listImg = (req, res) => {

    const id = req.params.id;
    db.query('CALL listImg(?)', [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi', error: err });
        } else {
            res.status(200).json(results[0]);
        }
    });
};
exports.login = (req, res) => {
    const { TaiKhoan, MatKhau } = req.body;
    if (!TaiKhoan || !MatKhau) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tài khoản và mật khẩu' });
    }
    db.query(
        'SELECT * FROM taikhoan WHERE TaiKhoan = ?', [TaiKhoan.trim()],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Lỗi đăng nhập', error: err });
            } else {
                if (results.length === 0) {
                    res.json({ message: 'Tài khoản không tồn tại' });
                } else {
                    const hashedPassword = results[0].MatKhau;
                    const hashedRole = results[0].LoaiQuyen;
                    // console.log(hashedRole);
                    // bcrypt.compare(MatKhau, hashedPassword, (bcryptErr, isMatch) => {
                    if (MatKhau == hashedPassword) {
                        if (hashedRole === 'admin' || hashedRole === 'staff') {
                            res.status(200).json({ message: 'Đăng nhập thành công chào admin, nhân viên' });
                        } else {
                            res.status(200).json({ message: 'Đăng nhập thành công chào khách hàng' });
                        }
                    } else {
                        res.status(401).json({ message: 'Mật khẩu không chính xác' });
                    }
                    // });
                }
            }
        }
    );
};

// exports.login = (req, res) => {
//     const { TaiKhoan, MatKhau } = req.body;

//     if (!TaiKhoan || !MatKhau) {
//         return res.status(400).json({ message: 'Vui lòng cung cấp tài khoản và mật khẩu' });
//     }

//     db.query(
//         'SELECT * FROM taikhoan WHERE TaiKhoan = ?', [TaiKhoan.trim()],
//         (err, results) => {
//             if (err) {
//                 res.status(500).json({ message: 'Lỗi đăng nhập', error: err });
//             } else {
//                 if (results.length === 0) {
//                     res.status(401).json({ message: 'Tài khoản không tồn tại' });
//                 } else {
//                     const hashedPassword = results[0].MatKhau;
//                     const hashedRole = results[0].LoaiQuyen;
//                     console.log(hashedRole);
//                     bcrypt.compare(MatKhau, hashedPassword, (bcryptErr, isMatch) => {
//                         if (isMatch) {
//                             const token = jwt.sign({ TaiKhoan, LoaiQuyen: hashedRole }, 'your_secret_key', {
//                                 expiresIn: '1h', // Thời gian sống của token, có thể thay đổi
//                             });

//                             if (hashedRole === 'admin') {
//                                 res.status(200).json({ message: 'Đăng nhập thành công chào admin', token });
//                             } else {
//                                 res.status(200).json({ message: 'Đăng nhập thành công chào nhân viên', token });
//                             }
//                         } else {
//                             res.status(401).json({ message: 'Mật khẩu không chính xác' });
//                         }
//                     });
//                 }
//             }
//         }
//     );
// };
// exports.verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;


//     if (!token) {
//         return res.status(403).json({ message: 'Không có token được cung cấp' });
//     }

//     jwt.verify(token, 'â', (err, decoded) => {
//         if (err) {
//             console.log(token);
//             return res.status(401).json({ message: 'Token không hợp lệ' });
//         }

//         req.user = decoded;
//         next();
//     });
// };