//信息修改
<template>
  <div>
    <crumbs></crumbs>
    <el-row type="flex" :gutter="24">
      <el-col :span="24">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息变更" name="first">
              <el-row type="flex" :gutter="24">
                <el-col :span="12">
                  <el-button type="primary" size="small" icon="el-icon-plus" @click="addmess()">新增</el-button>
                  <el-button size="small" icon="el-icon-printer">打印</el-button>
                  <el-button size="small" icon="el-icon-upload2">导出</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                  ></el-date-picker>
                  <el-button icon="el-icon-search" size="small" style="margin-left: 10px"></el-button>
                </el-col>
              </el-row>

              <el-table :data="tableData2" style="width: 100%;margin: 10px 0;" border>
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="danhao" label="变更单号" width="125"></el-table-column>
                <el-table-column prop="time" label="变更时间" width="100"></el-table-column>
                <el-table-column prop="zichanmingcheng" label="资产名称"></el-table-column>
                <el-table-column prop="zichanleixing" label="资产类型" width="180"></el-table-column>
                <el-table-column prop="people" label="使用人" width="180"></el-table-column>
                <el-table-column prop="gongsi" label="使用公司"></el-table-column>
                <el-table-column prop="bumen" label="使用部门" width="180"></el-table-column>
                <el-table-column prop="guanlipeole" label="管理员"></el-table-column>
                <el-table-column label="操作" fixed="right" width="90">
                  <template slot-scope="scope">
                    <el-button @click="readmess(scope.row)" type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout=" sizes, prev, pager, next"
                :total="40"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="维保信息变更" name="second">
              <el-row type="flex" :gutter="24">
                <el-col :span="12">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-plus"
                    @click="weiaddmess()"
                  >新增</el-button>
                  <el-button size="small" icon="el-icon-printer">打印</el-button>
                  <el-button size="small" icon="el-icon-upload2">导出</el-button>
                </el-col>
                <el-col :span="12" style="text-align:right">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                  ></el-date-picker>
                  <el-button icon="el-icon-search" size="small" style="margin-left: 10px"></el-button>
                </el-col>
              </el-row>
              <el-table :data="weibaolist2" style="width: 100%;margin: 10px 0;" border>
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="danhao" label="变更单号" width="180"></el-table-column>
                <el-table-column prop="zichanname" label="变更时间" width="120"></el-table-column>
                <el-table-column prop="time" label="资产名称" width="120"></el-table-column>
                <el-table-column prop="gongyishang" label="供应商"></el-table-column>
                <el-table-column prop="gongyingpeople" label="联系人"></el-table-column>
                <el-table-column prop="lianxifangshi" label="联系方式" width="180"></el-table-column>
                <el-table-column prop="daoqishijian" label="维保到期时间" width="120"></el-table-column>
                <el-table-column prop="zichanleixing" label="资产类型"></el-table-column>
                <el-table-column prop="usepeople" label="使用人"></el-table-column>
                <el-table-column prop="usegongsi" label="使用公司"></el-table-column>
                <el-table-column prop="usebumen" label="使用部门"></el-table-column>
                <el-table-column prop="guanlipeole" label="管理员"></el-table-column>

                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="scope">
                    <el-button @click="readtuikumess(scope.row)" type="text" size="small">查看</el-button>

                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout=" sizes, prev, pager, next"
                :total="100"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <!-- 增加弹框 -->
    <el-dialog title="领用单" :visible.sync="dialogFormVisible" width="945px">
      <el-tabs :tab-position="tabPosition">
        <el-row type="flex" :gutter="24">
          <el-form ref="form" :model="listchange" label-width="80px">
            <el-col :span="12" style="height:51px;">
              <el-form-item label="变更单号">
                <el-input
                  disabled="disabled"
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.danhao"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:51px;">
              <el-form-item label="处理时间">
                <el-date-picker
                  type="date"
                  :readonly="readonlys"
                  v-model="listchange.time"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="资产名称">
                <el-input
                  placeholder="资产名称"
                  v-model="listchange.zichanmingcheng"
                  size="small"
                  class="input-with-select"
                  :readonly="readonlys"
                >
                  <el-button slot="append" icon="el-icon-s-custom" @click="addmess3()"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="资产类型">
                <el-select
                  placeholder="资产类型"
                  :readonly="readonlys"
                  :disabled="disabled"
                  size="small"
                  v-model="listchange.zichanleixing"
                >
                  <el-option label="康佳" value="康佳" style="width:auto;"></el-option>
                  <el-option label="康宁" value="康宁"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="规格型号">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.xinghao"
                  placeholder="规格型号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="SN号">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.snhao"
                  placeholder="SN号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="计量单位">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.danwei"
                  placeholder="计量单位"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="存放地点">
                <el-select
                  placeholder="存放地点"
                  :readonly="readonlys"
                  :disabled="disabled"
                  size="small"
                  v-model="listchange.cunfangweizhi"
                >
                  <el-option label="康佳" value="康佳" style="width:auto;"></el-option>
                  <el-option label="康宁" value="康宁"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="管理员">
                <el-select
                  placeholder="管理员"
                  :readonly="readonlys"
                  :disabled="disabled"
                  size="small"
                  v-model="listchange.guanlipeole"
                >
                  <el-option label="康佳" value="康佳" style="width:auto;"></el-option>
                  <el-option label="康宁" value="康宁"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="使用期限">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.qixian"
                  placeholder="使用期限（月）"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="来源">
                <el-select
                  placeholder="来源"
                  :readonly="readonlys"
                  :disabled="disabled"
                  size="small"
                  v-model="listchange.laiyuan"
                >
                  <el-option label="购入" value="购入" style="width:auto;"></el-option>
                  <el-option label="自建" value="自建"></el-option>
                  <el-option label="捐赠" value="捐赠" style="width:auto;"></el-option>
                  <el-option label="租赁" value="租赁"></el-option>
                  <el-option label="其他" value="其他" style="width:auto;"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="备注" prop="desc">
                <el-input
                  type="textarea"
                  placeholder="领用备注"
                  v-model="listchange.beizhu"
                  :readonly="readonlys"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产照片">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="listchange.image" :src="listchange.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 102px;"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加弹框2 -->
    <el-dialog title="选择用户" :visible.sync="dialogFormVisible2" width="945px">
      <el-row type="flex" :gutter="24">
        <el-col :span="6">
          <el-tree
            :data="data1"
            :props="defaultProps"
            @node-click="handleNodeClick"
            style="border: 1px solid rgb(235, 238, 245); height: 300px; box-sizing: border-box;"
          ></el-tree>
        </el-col>
        <el-col :span="18">
          <el-table :data="peopletable2" border style="width: 100% " height="300">
            <el-table-column fixed label width="50">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="bianhao" label="员工工号" width="150"></el-table-column>
            <el-table-column prop="name" label="员工姓名" width="120"></el-table-column>
            <el-table-column prop="gongsi" label="所属公司" width="120"></el-table-column>
            <el-table-column prop="bumen" label="所属部门" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 增加弹框3 -->
    <el-dialog title="选择资产" :visible.sync="dialogFormVisible3" width="945px">
      <el-row type="flex" :gutter="24">
        <el-col :span="6">
          <el-tree
            :data="data2"
            :props="defaultProps"
            @node-click="handleNodeClick"
            style="border: 1px solid rgb(235, 238, 245);height: 300px;box-sizing: border-box;"
          ></el-tree>
        </el-col>
        <el-col :span="18">
          <el-table :data="peopletable1" border style="width: 100% " height="300">
            <el-table-column fixed label width="50">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="bianhao" label="员工工号" width="150"></el-table-column>
            <el-table-column prop="name" label="员工姓名" width="120"></el-table-column>
            <el-table-column prop="gongsi" label="所属公司" width="120"></el-table-column>
            <el-table-column prop="bumen" label="所属部门" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 退库弹框 -->
    <!-- danhao:"WB20180608001",
            time:"2018-06-18",
            zichanname:"打印机",
            gongyishang:"佳明",
            gongyingpeople:"张三",
            lianxifangshi:"13888888888",
            daoqishijian:"2018-06-18",
            zichanleixing:"电气设备",
            usepeople:"	张四",
            usegongsi:"光威",
            usebumen:"",
            guanlipeole:"allcky",
    beizhu:""-->
    <el-dialog title="退库单" :visible.sync="dialogFormVisible4" width="945px">
      <el-tabs :tab-position="tabPosition">
        <el-row type="flex" :gutter="24">
          <el-form ref="form" :model="weibaolistchange" label-width="100px">
            <el-col :span="12" style="height:51px;">
              <el-form-item label="变更单号">
                <el-input
                  disabled="disabled"
                  :readonly="readonlys"
                  size="small"
                  v-model="weibaolistchange.danhao"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:51px;">
              <el-form-item label="处理时间">
                <el-date-picker
                  type="date"
                  :readonly="readonlys"
                  v-model="weibaolistchange.time"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="资产名称">
                <el-input
                  placeholder="资产名称"
                  v-model="weibaolistchange.zichanname"
                  size="small"
                  class="input-with-select"
                  :readonly="readonlys"
                >
                  <el-button slot="append" icon="el-icon-s-custom" @click="addmess3()"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="供应商">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="weibaolistchange.gongyishang"
                  placeholder="供应商"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="联系人">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="weibaolistchange.gongyingpeople"
                  placeholder="联系人"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="联系方式">
                <el-input
                  :readonly="readonlys"
                  size="small"
                  v-model="weibaolistchange.lianxifangshi"
                  placeholder="联系方式"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="到期时间">
                <el-date-picker
                  type="date"
                  placeholder="维保到期时间"
                  :readonly="readonlys"
                  v-model="weibaolistchange.daoqishijian"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="desc">
                <el-input
                  type="textarea"
                  placeholder="领用备注"
                  v-model="weibaolistchange.beizhu"
                  :readonly="readonlys"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible4 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import crumbs from '@/components/index/crumbs.vue'
export default {
  components: {
    crumbs
  },
  data() {
    return {
      activeName: "first",
      value1: "",
      tableData2: [
        {
          danhao: "JB20180608001",
          time: "2018-06-18",
          zichanmingcheng: "打印机",
          zichanleixing: "电气设备",
          people: "张三",
          gongsi: "光威",
          bumen: "",
          guanlipeole: "allcky",
          snhao: "",
          xinghao: "",
          danwei: "",
          cunfangweizhi: "",
          qixian: "",
          laiyuan: "",
          beizhu: "",
          image: ""
        }
      ],
      tableData1: {
        danhao: "",
        time: "",
        zichanmingcheng: "",
        zichanleixing: "",
        people: "",
        gongsi: "",
        bumen: "",
        guanlipeole: "",
        snhao: "",
        xinghao: "",
        danwei: "",
        cunfangweizhi: "",
        qixian: "",
        laiyuan: "",
        beizhu: "",
        image: ""
      },
      listchange: {
        default: this.tableData1
      },
      dialogFormVisible: false,
      tabPosition: "left",
      dialogFormVisible2: false,
      tabPosition2: "left",
      dialogFormVisible3: false,
      tabPosition3: "left",
      dialogFormVisible4: false,
      data1: [
        {
          label: "康佳",
          children: [
            {
              label: "研发部"
            },
            {
              label: "人事部"
            },
            {
              label: "财务"
            }
          ]
        },
        {
          label: "康宁"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      peopletable2: [
        {
          bianhao: "1001",
          name: "张三",
          gongsi: "康佳",
          bumen: "研发部",
          email: "kskfhkj@sd.com",
          telephone: "1315646"
        },
        {
          bianhao: "1001",
          name: "张三",
          gongsi: "康佳  ",
          bumen: "人事部",
          email: "qwev@sd.com",
          telephone: "1315646"
        }
      ],
      peopletable1: [
        {
          bianhao: "",
          name: "",
          gongsi: "",
          bumen: "",
          email: "",
          telephone: ""
        }
      ],
      zichantable: [
        {
          Statuss: 0,
          zichanma: "",
          zichanname: "",
          type: "",
          typesize: "",
          indexs: "",
          danwei: "",
          monet: 0,
          gongsi: "",
          bumen: "",
          date: "",
          people: "",
          guanli: "",
          address: "",
          time: "",
          yuantou: "",
          w_weibao: "",
          w_lianxiren: "",
          W_dianhua: "",
          W_time: "",
          W_shuoming: ""
        }
      ],
      data2: [
        {
          label: "土地、房屋及构筑物"
        },
        {
          label: "电器设备"
        }
      ],
      readonlys: false,
      disabled:false,
      weibaolist1: [
        {
          danhao: "",
          time: "",
          zichanname: "",
          gongyishang: "",
          gongyingpeople: "",
          lianxifangshi: "",
          daoqishijian: "",
          zichanleixing: "",
          usepeople: "	",
          usegongsi: "",
          usebumen: "",
          guanlipeole: "",
          beizhu: ""
        }
      ],
      weibaolist2: [
        {
          danhao: "WB20180608001",
          time: "2018-06-18",
          zichanname: "打印机",
          gongyishang: "佳明",
          gongyingpeople: "张三",
          lianxifangshi: "13888888888",
          daoqishijian: "2018-06-18",
          zichanleixing: "电气设备",
          usepeople: "	张四",
          usegongsi: "光威",
          usebumen: "",
          guanlipeole: "allcky",
          beizhu: ""
        }
      ],
      weibaolistchange: {
        default: this.weibaolist1
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addmess() {
      this.dialogFormVisible = true;
      this.listchange = this.tableData1;
      this.readonlys = false;
    },
    addmess2() {
      this.dialogFormVisible2 = true;
      //   this.listchange = this.form1;
      this.readonlys = false;
    },
    addmess3() {
      this.dialogFormVisible3 = true;
      //   this.listchange = this.form1;
      this.readonlys = false;
    },
    readmess(ins) {
      this.dialogFormVisible = true;
      let newfprm = JSON.parse(JSON.stringify(ins));
      this.listchange = newfprm;
      this.readonlys = true;
      this.disabled = true;
    },
    
    weiaddmess() {
      this.dialogFormVisible4 = true;
      this.weibaolistchange = this.weibaolist1[0];
      this.readonlys = false;
    },
    readtuikumess(ins) {
      this.dialogFormVisible4 = true;
      let newfprm = JSON.parse(JSON.stringify(ins));
      this.weibaolistchange = newfprm;
      this.readonlys = true;
    },
    handleNodeClick(data1) {
      console.log(data1);
    },
    handleAvatarSuccess(res, file) {
      this.l = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 204px;
  height: 102px;
  line-height: 102px;
  text-align: center;
}
.avatar {
  width: 204px;
  height: 102px;
  display: block;
}
.el-select .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    cursor: pointer;
}
.el-input.is-disabled .el-input__inner {
    background-color: #fff;
    cursor: pointer;
}
.el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff; 
    cursor: pointer;
}
</style>

