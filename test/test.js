const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true,
    typeInterval: 150,
    waitTimeout: 5000,
    gotoTimeout: 5000,
    maxHeight:4000, maxWidth:4000,
    width: 4000, height: 4000
})

const start_url = 'http://10.10.10.54:2334/product/SKII-0066'
const login_btn_top = 'html > body.syg-product > div.page-container:nth-child(1) > header.header:nth-child(1) > div.wrapper:nth-child(1) > div.user-option:nth-child(2) > a:nth-child(1) > span:nth-child(1)'
const login_account_input = '#account'
const login_pass_input = '#password'
const login_submit = '#submit_btn'
const six_btn = '#btn > div.btn-switch > button:nth-child(2)'
const twelve_btn = '#btn > div.btn-switch > button:nth-child(3)'
const add_btn = '#item_picker > button.add'
const sub_btn = '#item_picker > button.reduce'
const agreement_check = 'input#agreement'
const order_btn = '#order'
const reg_btn = '#forgetPassword'
const phone_input = '#account'
const sms_check_input = '#sign_up_form > div > div:nth-child(2) > div.verification-pc > div > input'
const password_input = '#sign_up_form > div > div:nth-child(4) > div.password.form-control > input'
const password_confirm_input = "#password_confirm"
const registion_btn = '#submit_btn'

const contact_address_input = 'form#addressForm > div.detail-address.form-group.form-inline:nth-child(4) > div.textarea:nth-child(2) > textarea.form-control:nth-child(1)'
const contact_name_input = '#addressForm > div.input-container > div:nth-child(1) > div > input'
const contact_phonenum_input = '#addressForm > div.input-container > div:nth-child(2) > div > input'
const contact_agreement_check = 'input#agreement'
const contact_submit_btn = '#submit_btn'

const fivedays_later_btn = '#delivery-option > button:nth-child(2)'
const code_input = '#recommend-code > div.form-group.has-feedback.has-error > input[type="text"]'
const order_confirm_btn = 'body > div > div > section > div > div.pay > div > button'

const pay_wechat = 'body > div > div > div > section.pay > div.pay-container > div > div.we-chat > a'
const pay_alipay = 'body > div > div > div > section.pay > div.pay-container > div > div.alipay > a'
const pay_btn = '#paynow'

const alipay_go_on_btn = 'body > div.am-content > div > div:nth-child(5) > a'

const alipay_phonenum ='#logon_phone'

describe('Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('100s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare({
            show: true,
            typeInterval: 80,
            waitTimeout: 50000,
            gotoTimeout: 50000,
            maxHeight:4000, maxWidth:4000,
            width: 1440, height: 900
        })
    })

    let phontnum = '13880800823'
    describe('/ Try to register a new account', () => {
        it('should process without error', done =>{
            nightmare.goto(start_url)
                .wait(login_btn_top)
                .click(login_btn_top)
                .wait(reg_btn)
                .click(reg_btn)
                .wait(2000)
                .type(phone_input, phontnum)
                .type(sms_check_input, '123456')
                .type(password_input, 'a123456')
                .type(password_confirm_input, 'a123456')
                .wait(300)
                .click(agreement_check)
                .wait(300)
                .click(registion_btn)
                .url()
                .wait(twelve_btn)
                .click(twelve_btn)
                .wait(500)
                .click(six_btn)
                .wait(500)
                .click(add_btn)
                .wait(500)
                .click(add_btn)
                .wait(500)
                .click(sub_btn)
                .wait(500)
                .click(agreement_check)
                .wait(300)
                .screenshot('product_details.png')
                .click(order_btn)

                //order confirm
                .wait(2000)
                .select('select#province', 23)
                .wait(200)
                .select('#city', 277)
                .wait(200)
                .select('#district', 2383)
                .type(contact_address_input, 'Test Address x-y-z')
                .type(contact_name_input, 'TesterX')
                .type(contact_phonenum_input, '13880808080')
                .click(contact_agreement_check)
                .click(contact_submit_btn)

                // Submit order
                .wait(2000)
                .click(fivedays_later_btn)
                .wait(1000)
                .scrollTo('bottom', 'left')
                .wait(100)
                .click(order_confirm_btn)

                .url()

                // Payment
                .wait(3000)
                .click(pay_wechat)
                .wait(300)
                .click(pay_alipay)
                .wait(300)
                .click(pay_wechat)
                .wait(300)
                .click(pay_btn)

                .wait(5000)
                .click(alipay_go_on_btn)
                .wait(3000)
                .type(alipay_phonenum, '13880008000')
                .wait(15000)
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

    // describe('/ (Try goto Login Page and back and finish the order with new account)', () => {
    //     it('should process without error', done => {
    //         nightmare.goto(start_url)
    //             // Start with Product Details page
    //             .wait(login_btn_top)
    //             .click(login_btn_top)
    //
    //             // Jump to Login page
    //             .wait(login_account_input)
    //             .type(login_account_input, '13800001111')
    //             .type(login_pass_input, 'a123456')
    //             .wait(500)
    //             .click(login_account_input)
    //             .click(login_pass_input)
    //
    //             .wait(500)
    //             .click(login_submit)
    //
    //             // Jump to Product details page
    //             .wait(500)
    //
    //
    //             .end()
    //
    //             .then(function (result) {
    //                 done()
    //                 console.log(result)
    //             })
    //             .catch(done)
    //             .catch(function (error) {
    //                 console.error('Error:', error);
    //             })
    //     })
    // })

})

