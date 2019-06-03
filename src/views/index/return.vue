//借用归还
<template>
  <div>
    <crumbs></crumbs>
    <el-row type="flex" :gutter="24">
      <el-col :span="24">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="借用" name="first">
              <el-row type="flex" :gutter="24">
                <el-col :span="12">
                  <el-button type="primary" size="small" icon="el-icon-plus" @click="addmess()">新增</el-button>
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="open">归还</el-button>
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
              <el-table :data="tableData2" style="width: 100%;margin: 10px 0;" border @select="deleteone"
                  @select-all="deleteall">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="Statuss" label="资产状态" width="80">
                  <template slot-scope="scope">
                    <status :status="scope.row.Statuss"></status>
                  </template>
                </el-table-column>
                <el-table-column prop="danhao" label="借用单号" width="130"></el-table-column>
                <el-table-column prop="time" label="借用时间" width="120"></el-table-column>
                <el-table-column prop="people" label="借用人"></el-table-column>
                <el-table-column prop="jiechuchulipeople" label="借出处理人"></el-table-column>
                <el-table-column prop="guihuanchulir" label="归还处理人" width="120"></el-table-column>
                <el-table-column prop="yujibacktime" label="预计归还时间" width="120"></el-table-column>
                <el-table-column prop="backtime" label="归还时间" width="120"></el-table-column>
                <el-table-column label="操作" width="100">
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
          <el-form ref="form"  label-width="100px">
            <el-col :span="8" style="height:51px;">
              <el-form-item label="借用人">
                <el-input
                  v-model="listchange.people"
                  size="small"
                  class="input-with-select"
                  :readonly="readonlys"
                >
                  <el-button slot="append" icon="el-icon-s-custom" @click="addmess2()"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="借出时间">
                <el-date-picker
                  type="date"
                  placeholder="选择借出日期"
                  :readonly="readonlys"
                  v-model="listchange.time"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="预计归还">
                <el-date-picker
                  type="date"
                  placeholder="预计归还时间"
                  :readonly="readonlys"
                  v-model="listchange.yujibacktime"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="借出处理人">
                <el-input
                  disabled="disabled"
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.jiechuchulipeople"
                  placeholder="处理人"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:51px;">
              <el-form-item label="归还处理人">
                <el-input
                  disabled="disabled"
                  :readonly="readonlys"
                  size="small"
                  v-model="listchange.guihuanchulir"
                  placeholder="处理人"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" style="height:51px;">
              <el-form-item label="归还时间">
                <el-date-picker
                  type="date"
                  placeholder="归还时间"
                  v-model="listchange.backtime"
                  :readonly="readonlys"
                  size="small"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="说明" prop="desc">
                <el-input
                  type="textarea"
                  placeholder="领用备注"
                  v-model="listchange.beizhu"
                  :readonly="readonlys"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row type="flex" :gutter="24">
          <el-col :span="8" style="height:51px;">
            <el-button size="small" @click="addmess3()">选择资产</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="zichantable" style="width: 100%" border height="126">
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="zichanma" label="资产条码" width="160"></el-table-column>
          <el-table-column prop="zichanname" label="资产名称" width="160"></el-table-column>
          <el-table-column prop="gongsi" label="使用公司"></el-table-column>
          <el-table-column prop="date" label="使用部门" width="160"></el-table-column>
          <el-table-column prop="bumen" label="使用人" width="120"></el-table-column>
          <el-table-column prop="guanli" label="管理员"></el-table-column>
          <el-table-column prop="address" label="存放地点" width="120"></el-table-column>
        </el-table>
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
  </div>
</template>
<script>
import crumbs from "@/components/index/crumbs.vue";
import status from "@/components/index/status.vue";
export default {
  components: {
    crumbs,
    status
  },
  data() {
    return {
      activeName: "first",
      value1: "",
      tableData2: [
        {
          Statuss: 0,
          danhao: "LY20180618003",
          time: "2018-06-18",
          people: "张三",
          bumen: "研发部",
          gongsi: "康达",
          yujibacktime: "2018-06-17",
          backtime: "2018-06-18",
          cunplace: "",
          jiechuchulipeople: "allcky",
          guihuanchulir: "",
          beizhu: ""
        },
      ],
      tableData1: [
        {
          Statuss: 0,
          danhao: "",
          time: "",
          people: "",
          bumen: "",
          gongsi: "",
          yujibacktime: "",
          backtime: "",
          cunplace: "",
          jiechuchulipeople: "",
          guihuanchulir: "",
          beizhu: ""
        }
      ],
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
      duixiangs: {}
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
    },
    handleNodeClick(data1) {
      console.log(data1);
    },
    deleteone(val) {
      this.duixiangs = val;
    },
    deleteall(val) {
      this.duixiangs = val;
    },
    open() {
      if (this.duixiangs.length > 0) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }else{
         this.$message('请选中要删除的数据条目！');
      }
    }
  }
};
</script>
<style>
</style>

