<template>
  <div>
    <crumbs></crumbs>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>修改密码</span>
        </div>
        <el-row>
            <el-col :span="12">
                <el-form
                :model="userlable" :rules="rules" ref="userlable" label-position="right" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userlable.username"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input v-model="userlable.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repassword">
                        <el-input v-model="userlable.repassword"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-button>取消</el-button>
            <el-button type="primary" @click="submitForm('userlable')">确认</el-button>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/index/crumbs.vue'
export default {
    data(){
        var validuser = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } 
            if (value != this.$store.state.username) {
                callback(new Error('用户名不一致'));
            } else {
                callback();
            }
        };
        var validpass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请确认密码'));
            } 
            if (value != this.userlable.password) {
                callback(new Error('密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userlable: {
                username: this.$store.state.username,
                password: '',
                repassword: ''
            },
            rules: {
                username: { validator: validuser, trigger: 'blur' },
                password: { required: true, message: '密码不能为空', trigger: 'blur' },
                repassword: { validator: validpass, trigger: 'blur' }
            }
        }
    },
    components: {
        crumbs
    },
    methods: {
      submitForm(userlable) {
        this.$refs[userlable].validate((valid) => {
          if (valid) {
            this.$message({message: '修改成功',type: 'success'});
          } else {
            this.$message.error('修改失败');
            return false;
          }
        });
      }
    }
}
</script>

