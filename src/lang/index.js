import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n ({
    local: 'en',
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages: {
        en: {
            auth: {
                email_address: 'Email address',
                password: 'Password',
                remember_me: 'Remember me',
                forget_password: 'Forget Password ?',
                login: 'Login',
                return_login: 'return to login ?',
                submit: 'Submit',
                key_code: 'Key Code',
                new_password: 'New Password',
                con_new_password: 'Confirm New Password',
            },

            app: {
                all            : 'All',
                hello          : 'Hello',
                profile        : 'Profile',
                logout         : 'Logout',
                update         : 'Update',
                create         : 'Create',
                back           : 'Back',
                cancel         : 'Cancel',

                // msgs
                success_title  : 'Great job,',
                success_msg    : 'Request Completed Successfully.',
                warning_title  : 'Wow, man',
                warning_msg    : 'Slow down, ',
                error_title    : 'Wow-wow,',
                error_msg      : 'Something went wrong.',
                no_data        : 'No data found.',
                invalid_credentials : 'Invalid Credentials',
            },

            nav: {
                dashboard  : 'Dashboard',
                malls      : 'Malls',
                shops      : 'Shops',
                categories : 'Categories',
                products   : 'Products',
                attributes : 'Attributes',
                orders     : 'Orders',
                requests   : 'Requests',
                messages   : 'Messages',
                users      : 'Users',
                offers     : 'Offers',
                sliders    : 'Sliders',
                settings   : 'Settings',
                pages      : 'Pages'
            },

        },









        /* arabic language */
        ar: {
            auth: {
                email_address: 'البريد الإلكتروني',
                password: 'كلمة المرور',
                remember_me: 'تذكرني',
                forget_password: 'نسيت كلمة المرور ؟',
                login: 'تسجيل دخول',
                return_login: 'رجوع لتسجيل الدخول؟',
                submit: 'إرسالة',
                key_code: 'الكود',
                new_password: 'كلمة المرور الجديدة',
                con_new_password: 'تأكيد كلمة المرور',
            },

            app: {
                all            : 'الكل',
                hello          : 'مرحباً ',
                profile        : 'بروفيل',
                logout         : 'تسجيل خروج',
                update         : 'تعديل',
                create         : 'إنشاء',
                back           : 'رجوع',
                cancel         : 'إلغاء',
                
                // msgs
                success_title  : 'عمل رائع,',
                success_msg    : 'تم تنفيذ طلبك بنجاح',
                warning_title  : 'أنتظر من فضلك',
                warning_msg    : '',
                error_title    : 'خطأ',
                error_msg      : 'حدث خطأ من الخادم من فضلك حاول مرة آخري',
                no_data        : 'لا يوجد بيانات',
                invalid_credentials : 'البيانات غير صحيحة',
            },

            nav: {
                dashboard  : 'لوحة التحكم',
                malls      : 'المولات',
                shops      : 'المحلات',
                categories : 'الأقسام',
                products   : 'المنتجات',
                attributes : 'الخصائص',
                orders     : 'الطلبات',
                requests   : 'الطلبات',
                messages   : 'الرسائل',
                users      : 'الأعضاء',
                offers     : 'العروض',
                sliders    : 'السليدر',
                settings   : 'الإعدادات',
                pages      : 'الصفحات'
            },

            

        },
    }
})