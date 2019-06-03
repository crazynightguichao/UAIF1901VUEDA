<template>
    <div>
        <div class="login-layout">
            <div class="login-box">
                <div class="login-left">
                    <img src="../assets/logo1.png" alt="">
                </div>
                <div class="login-right">
                    <h3>用户登录</h3>
                    <el-form status-icon :model="formData" :rules="formRules" ref="formData">
                        <el-form-item  prop="username">
                            <el-input v-model="formData.username" placeholder="账号"></el-input>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <el-input type="password" v-model="formData.password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-btn"  type="primary" @click="loginFun('formData')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="copyright">
            Copyright ©2018 dingai, All Rights Reserved.
        </div>
    </div>
</template>

<script>
    export default{
        components:{
            
        },
        data(){
            return{
                formData:{
                    username: '',
                    password: '',
                },
                formRules:{
                    "username":[{
                        required:true,
                        message:'请输入账号',
                        trigger:'blur',
                    }],
                    "password":[{
                        required:true,
                        message:'请输入密码',
                        trigger:'blur',
                    }]
                }
            }
        },
        created(){
            console.log('登录')
        },
        methods:{
            // 登录
            loginFun(ruleForm){
                this.$refs[ruleForm].validate((valid)=>{
                    if (valid){
                        this.$store.commit('login',this.formData)
                        console.log(this.$store)
                        this.$message({
                            showClose: true,
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$router.push({name:'index'})
                    }else{
                        console.log('error submit');
                        // return false;
                        this.$message.error('登录失败');
                    }
                });
                
            }
        }
    }
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.login-layout{
    background: url(../assets/beijing.jpg) no-repeat 50%/cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-layout .login-box {
    width: 547px;
    height: 226px;
    display: flex;
}
.login-layout .login-box .login-left{
    width: 240px;
    height: 100%;
    border-right: 1px solid hsla(0,0%,100%,.2);
}
.login-layout .login-box .login-left img{
    margin-top: 20px;
    width: 100%;
    height: 174px;
}
.login-layout .login-box .login-right {
    margin-left: 26px;
    width: 280px;
}
.login-layout .login-box .login-right h3 {
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    font-weight: 400;
}
.login-btn{
    width: 100%;
}
.copyright{
    color: rgba(255, 255, 255, .5);
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
}
</style>
