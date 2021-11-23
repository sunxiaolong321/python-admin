<template>
    <el-card class="login-card">
        <div class="head">
            <div class="name">Python软件后台管理系统</div>
        </div>
        <el-form
            @keyup.enter="test"
            label-position="top"
            :rules="rules"
            :model="ruleForm"
            ref="loginForm"
            hide-required-asterisk
            status-icon
            class="login-form"
        >
            <el-form-item label="账号" prop="username">
                <el-input
                    type="text"
                    v-model.trim="ruleForm.username"
                    autocomplete="off"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    v-model.trim="ruleForm.password"
                    autocomplete="off"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <div class="login-agreement">
                    登录表示您已同意
                    <a>《服务条款》</a>
                </div>
                <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
                <el-checkbox v-model="checked" @change="!checked" class="auto-login">下次自动登录</el-checkbox>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { ref, toRefs, reactive } from 'vue'
import { useRouter } from 'vue-router'
import crypto from 'crypto'
import qs from 'qs'
import axios from '@/api'
import { ElMessage } from 'element-plus'

export default {
    name: 'Login',
    setup(props, { emit }) {
        const router = useRouter()
        const loginForm = ref(null)

        const state = reactive({
            ruleForm: {
                username: '',
                password: '',
            },
            checked: false,
            rules: {
                username: [
                    { required: 'true', message: '账户不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: 'true', message: '密码不能为空', trigger: 'blur' }
                ]
            }
        })

        const submitForm = async () => {

            emit('loading', true);
            loginForm.value.validate(valid => {
                if (valid) {
                    // let hash = crypto.createHash('md5')
                    // console.log(345);
                    // let password = hash.update(state.ruleForm.password).digest('base64');
                    axios.post('/login', qs.stringify({
                        username: state.ruleForm.username,
                        password: state.ruleForm.password
                    })).then(res => {
                        if (res.is_valicated) {
                            localStorage.setItem('token', res.token)
                            localStorage.setItem('username', state.ruleForm.username)
                            ElMessage.success('登陆成功');
                            router.push('/')
                        } else {
                            ElMessage.error('账号或密码错误，请重新输入');
                        }
                    }).finally(() => {
                        emit('loading', false);
                    })
                } else {
                    return false
                }
            })
        }

        const test = () => {
            console.log(state.checked);
        }

        return {
            ...toRefs(state),
            loginForm,
            submitForm,
            test
        }
    }
}
</script>

<style scoped>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 30px 0;
}
.head > .name {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
}
.login-card {
    width: 420px;
    height: 500px;
    margin: 0 auto;
    border-radius: 12px;
    margin-top: 200px;
}
.login-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.login-form {
    width: 80%;
    margin: 0 auto;
}
.login-agreement {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #606266;
}
.auto-login {
    margin-top: 5px;
    display: flex;
    /* margin: auto 0; */
    align-items: center;
    justify-content: center;
}
</style>