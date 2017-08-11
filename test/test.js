const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    typeInterval: 150,
    waitTimeout: 5000,
    gotoTimeout: 5000,
})

const start_url = 'http://10.10.10.54:2334/product/SKII-0066'
const login_btn_top = 'html > body.syg-product > div.page-container:nth-child(1) > header.header:nth-child(1) > div.wrapper:nth-child(1) > div.user-option:nth-child(2) > a:nth-child(1) > span:nth-child(1)'
const login_account_input = '#account'
const login_pass_input = '#password'
const login_submit = '#submit_btn'

describe('Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('10s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    })

    describe('/ (Try goto Login Page and back and finish the order)', () => {
        it('should process without error', done => {
            nightmare.goto(start_url)

                .wait(login_btn_top)
                .click(login_btn_top)

                .wait(login_account_input)
                .type(login_account_input, '13800001111')
                .type(login_pass_input, 'a123456')
                .wait(500)
                .click(login_account_input)
                .click(login_pass_input)

                .wait(500)
                .click(login_submit)
                .wait(500)
                .screenshot('product_details.png')

                .url()
                .end()

                .then(function (result) {
                    done()
                    console.log(result)
                })
                .catch(done)
                .catch(function (error) {
                    console.error('Error:', error);
                })
            })
        })

})

