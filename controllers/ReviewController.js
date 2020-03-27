const { Review, User } = require('../models')

class ReviewController {
    static showByProduct (req, res, next) {
        const ProductId = req.params.productId

        Review.findAll({
            where: {
                ProductId: ProductId
            },
            include: [ User ]
        })
            .then((response) => {
                res.status(200).json({
                    data: response
                })
            })
            .catch((err) => {
                next(err)
            })

    }

    static addReview (req, res, next) {
        const point= req.body.point
        const review= req.body.review
        const ProductId = req.body.ProductId
        const UserId = req.decoded.id

        Review.create({
            point,
            review,
            UserId,
            ProductId
        })
            .then((response) => {
                res.status(201).json({
                    data: response
                })
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = ReviewController