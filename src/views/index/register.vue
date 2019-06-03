//资产登记
<template>
  <div>
    <crumbs></crumbs>
    <el-row type="flex" :gutter="24">
      <el-col :span="24">
        <el-card>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="资产登记" name="first">
                <el-row type="flex" :gutter="24">
                  <el-col :span="18">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addmess()">新增</el-button>
                    <el-button type="danger" size="small" @click="dell()" icon="el-icon-delete" >删除</el-button>
                    <el-dropdown
                      split-button
                      type="primary"
                      size="small"
                      @click="handleClick2"
                      style="margin-left:10px;"
                    >
                      <i class="el-icon-upload2"></i>
                      导入/导出
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>下载导入模板</el-dropdown-item>
                        <el-dropdown-item >批量导入资产</el-dropdown-item>
                        <el-dropdown-item divided>导出资产</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown
                      split-button
                      type="primary"
                      size="small"
                      @click="handleClick2"
                      style="margin-left:10px;"
                    >
                      <i class="el-icon-printer"></i>
                      打印
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>打印资产标签</el-dropdown-item>
                        <el-dropdown-item>打印资产卡片</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>

                  <el-col :span="6">
                    <div>
                      <el-input
                        placeholder="请输入搜索内容"
                        size="small"
                        v-model="input3"
                        class="input-with-select"
                      >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-table
                  :data="tableData2"
                  style="width: 100%;margin:10px 0;"
                  border
                  @select="deleteone"
                  @select-all="deleteall"
                >
                  <el-table-column type="selection" fixed="left" width="55"></el-table-column>
                  <el-table-column prop="Statuss" label="资产状态" width="120">
                    <template slot-scope="scope">
                      <status :status="scope.row.Statuss"></status>
                    </template>
                  </el-table-column>
                  <el-table-column prop="zichanma" label="资产条码" width="120"></el-table-column>
                  <el-table-column prop="zichanname" label="资产名称" width="120"></el-table-column>
                  <el-table-column prop="type" label="资产名称" width="120"></el-table-column>
                  <el-table-column prop="typesize" label="规格型号" width="120"></el-table-column>
                  <el-table-column prop="indexs" label="产品序列" width="120"></el-table-column>
                  <el-table-column prop="danwei" label="计量单位" width="120"></el-table-column>
                  <el-table-column prop="monet" label="金额" width="120">
                    <template slot-scope="scope">
                      <p>{{scope.row.monet|currency('￥',3)}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="gongsi" label="使用公司" width="120"></el-table-column>
                  <el-table-column prop="bumen" label="使用部门" width="120"></el-table-column>
                  <el-table-column prop="date" label="购买时间" width="120"></el-table-column>
                  <el-table-column prop="people" label="使用人" width="120"></el-table-column>
                  <el-table-column prop="guanli" label="管理员" width="120"></el-table-column>
                  <el-table-column prop="address" label="存放地点" width="120"></el-table-column>
                  <el-table-column prop="time" label="使用期限" width="120"></el-table-column>
                  <el-table-column prop="yuantou" label="来源" width="120"></el-table-column>

                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button
                        @click="readmess(scope.row)"
                        type="text"
                        size="small"
                      >查看</el-button>
                      <el-button
                        @click="changemess(scope.row, scope.$index)"
                        type="text"
                        size="small"
                      >编辑</el-button>
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
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 增加弹框 -->
    <el-dialog title="资产登记" :visible.sync="dialogFormVisible" width="945px">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="listchange" :model="listchange" :rules="rules" label-width="80px">
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产条码" class="item" prop="zichanma">
                  <el-input
                    disabled="disabled"
                    :readonly="readonlys"
                    v-model="listchange.zichanma"
                    size="small"
                    placeholder="自动生成"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产名称" class="item" prop="zichanname">
                  <el-input
                    v-model="listchange.zichanname"
                    :readonly="readonlys"
                    size="small"
                    placeholder="资产名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产类型" class="item" prop="type">
                  <el-select
                    v-model="listchange.type"
                    placeholder="资产类型"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="规格型号" class="item" prop="typesize">
                  <el-input
                    v-model="listchange.typesize"
                    :readonly="readonlys"
                    size="small"
                    
                    placeholder="规格型号"
                  ></el-input>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="SN号" class="item" prop="indexs">
                  <el-input
                    v-model="listchange.indexs"
                    size="small"
                    :readonly="readonlys"
                    placeholder="SN号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="计量单位" class="item" prop="danwei">
                  <el-input
                    v-model="listchange.danwei"
                    size="small"
                    :readonly="readonlys"
                    placeholder="计量单位"
                  ></el-input>
                </el-form-item >  
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="金额" class="item" prop="monet">
                  <el-input
                    v-model="listchange.monet"
                    size="small"
                    :readonly="readonlys"
                    placeholder="金额"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用公司" class="item" prop="gongsi">
                  <el-select
                    v-model="listchange.gongsi"
                    placeholder="使用公司"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用部门" class="item" prop="bumen">
                  <el-select
                    v-model="listchange.bumen"
                    placeholder="使用部门"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="选择日期" class="item" prop="date">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="listchange.date"
                      style="width: 100%;"
                      size="small"
                      :readonly="readonlys"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用人" class="item" prop="people">
                  <el-select
                    v-model="listchange.people"
                    placeholder="使用人"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="管理人" class="item" prop="guanli">
                  <el-select
                    v-model="listchange.guanli"
                    placeholder="管理人"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="存放地点" class="item" prop="address">
                  <el-select
                    v-model="listchange.address"
                    placeholder="存放地点"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用期限" class="item" prop="time">
                  <el-input
                    v-model="listchange.time"
                    size="small"
                    placeholder="使用期限（月）"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="来源" class="item" prop="yuantou">
                  <el-select v-model="listchange.yuantou" placeholder="来源" size="small" :disabled="disabled">
                    <el-option label="购入" value="购入"></el-option>
                    <el-option label="自建" value="自建"></el-option>
                    <el-option label="捐赠" value="捐赠"></el-option>
                    <el-option label="租赁" value="租赁"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange.text"
                    placeholder="备注"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :readonly="readonlys"
                  >
                    <img v-if="tableData1.imageUrl" :src="listchange.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style=" line-height: 100px;"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="form" label-width="80px">
              <el-col :span="12" style="height:51px;">
                <el-form-item label="供应商" class="item" prop="w_weibao">
                  <el-input
                    v-model="listchange.w_weibao"
                    size="small"
                    placeholder="供应商名称"
                    :readonly="readonlys"
                    
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系人" class="item" prop="w_lianxiren">
                  <el-input
                    v-model="listchange.w_lianxiren"
                    size="small"
                    placeholder="联系人"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系方式" class="item" prop="W_dianhua">
                  <el-input
                    v-model="listchange.W_dianhua"
                    size="small"
                    placeholder="联系方式"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="维保到期" class="item" prop="W_time">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="维保到期时间"
                      v-model="listchange.W_time"
                      :disabled="disabled"
                      style="width: 100%;"
                      size="small"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="维保说明" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange.W_shuoming"
                    placeholder="维保说明"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        
        <el-button @click="resetForm('listchange')">重 置</el-button>
        <el-button type="primary" @click="open2('listchange')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 查看弹框 -->
    <el-dialog title="资产登记" :visible.sync="chaVisible" width="945px">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="listchange2" :model="listchange2" :rules="rules" label-width="80px">
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产条码" class="item">
                  <el-input
                    disabled="disabled"
                    :readonly="readonlys"
                    v-model="listchange2.zichanma"
                    size="small"
                    placeholder="自动生成"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产名称" class="item" >
                  <el-input
                    v-model="listchange2.zichanname"
                    :readonly="readonlys"
                    size="small"
                    placeholder="资产名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产类型" class="item" >
                  <el-select
                    v-model="listchange2.type"
                    placeholder="资产类型"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="规格型号" class="item">
                  <el-input
                    v-model="listchange2.typesize"
                    :readonly="readonlys"
                    size="small"
                    
                    placeholder="规格型号"
                  ></el-input>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="SN号" class="item">
                  <el-input
                    v-model="listchange2.indexs"
                    size="small"
                    :readonly="readonlys"
                    placeholder="SN号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="计量单位" class="item">
                  <el-input
                    v-model="listchange2.danwei"
                    size="small"
                    :readonly="readonlys"
                    placeholder="计量单位"
                  ></el-input>
                </el-form-item >  
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="金额" class="item" >
                  <el-input
                    v-model="listchange2.monet"
                    size="small"
                    :readonly="readonlys"
                    placeholder="金额"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用公司" class="item" >
                  <el-select
                    v-model="listchange2.gongsi"
                    placeholder="使用公司"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用部门" class="item" >
                  <el-select
                    v-model="listchange2.bumen"
                    placeholder="使用部门"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="选择日期" class="item">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="listchange2.date"
                      style="width: 100%;"
                      size="small"
                      :readonly="readonlys"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用人" class="item" >
                  <el-select
                    v-model="listchange2.people"
                    placeholder="使用人"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="管理人" class="item">
                  <el-select
                    v-model="listchange2.guanli"
                    placeholder="管理人"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="存放地点" class="item" >
                  <el-select
                    v-model="listchange2.address"
                    placeholder="存放地点"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用期限" class="item">
                  <el-input
                    v-model="listchange2.time"
                    size="small"
                    placeholder="使用期限（月）"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="来源" class="item" >
                  <el-select v-model="listchange2.yuantou" placeholder="来源" size="small" :disabled="disabled">
                    <el-option label="购入" value="购入"></el-option>
                    <el-option label="自建" value="自建"></el-option>
                    <el-option label="捐赠" value="捐赠"></el-option>
                    <el-option label="租赁" value="租赁"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange2.text"
                    placeholder="备注"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :readonly="readonlys"
                  >
                    <img v-if="tableData1.imageUrl" :src="listchange2.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style=" line-height: 100px;"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="form" label-width="80px">
              <el-col :span="12" style="height:51px;">
                <el-form-item label="供应商" class="item" >
                  <el-input
                    v-model="listchange2.w_weibao"
                    size="small"
                    placeholder="供应商名称"
                    :readonly="readonlys"
                    
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系人" class="item" >
                  <el-input
                    v-model="listchange2.w_lianxiren"
                    size="small"
                    placeholder="联系人"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系方式" class="item" >
                  <el-input
                    v-model="listchange2.W_dianhua"
                    size="small"
                    placeholder="联系方式"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="维保到期" class="item">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="维保到期时间"
                      v-model="listchange2.W_time"
                      :disabled="disabled"
                      style="width: 100%;"
                      size="small"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="维保说明" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange2.W_shuoming"
                    placeholder="维保说明"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chaVisible = false">确 定</el-button> 
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="资产登记" :visible.sync="bianVisible" width="945px">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="基本信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="listchange3" :model="listchange3" :rules="rules" label-width="80px">
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产条码" class="item">
                  <el-input
                    disabled="disabled"
                    :readonly="readonlys"
                    v-model="listchange3.zichanma"
                    size="small"
                    placeholder="自动生成"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产名称" class="item" >
                  <el-input
                    v-model="listchange3.zichanname"
                    :readonly="readonlys"
                    size="small"
                    placeholder="资产名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="资产类型" class="item" >
                  <el-select
                    v-model="listchange3.type"
                    placeholder="资产类型"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="规格型号" class="item">
                  <el-input
                    v-model="listchange3.typesize"
                    :readonly="readonlys"
                    size="small"
                    
                    placeholder="规格型号"
                  ></el-input>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="SN号" class="item">
                  <el-input
                    v-model="listchange3.indexs"
                    size="small"
                    :readonly="readonlys"
                    placeholder="SN号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="计量单位" class="item">
                  <el-input
                    v-model="listchange3.danwei"
                    size="small"
                    :readonly="readonlys"
                    placeholder="计量单位"
                  ></el-input>
                </el-form-item >  
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="金额" class="item" >
                  <el-input
                    v-model="listchange3.monet"
                    size="small"
                    :readonly="readonlys"
                    placeholder="金额"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用公司" class="item" >
                  <el-select
                    v-model="listchange3.gongsi"
                    placeholder="使用公司"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item >
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用部门" class="item" >
                  <el-select
                    v-model="listchange3.bumen"
                    placeholder="使用部门"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="选择日期" class="item">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="listchange3.date"
                      style="width: 100%;"
                      size="small"
                      :readonly="readonlys"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用人" class="item" >
                  <el-select
                    v-model="listchange3.people"
                    placeholder="使用人"
                    size="small"
                    :readonly="readonlys"
                    :disabled="disabled"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="管理人" class="item">
                  <el-select
                    v-model="listchange3.guanli"
                    placeholder="管理人"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="存放地点" class="item" >
                  <el-select
                    v-model="listchange3.address"
                    placeholder="存放地点"
                    :readonly="readonlys"
                    :disabled="disabled"
                    size="small"
                  >
                    <el-option label="New York" value="New York" style="width:auto;"></el-option>
                    <el-option label="Londown" value="Londown"></el-option>
                    <el-option label="Sydney" value="Sydney"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="使用期限" class="item">
                  <el-input
                    v-model="listchange3.time"
                    size="small"
                    placeholder="使用期限（月）"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="height:51px;">
                <el-form-item label="来源" class="item" >
                  <el-select v-model="listchange3.yuantou" placeholder="来源" size="small" :disabled="disabled">
                    <el-option label="购入" value="购入"></el-option>
                    <el-option label="自建" value="自建"></el-option>
                    <el-option label="捐赠" value="捐赠"></el-option>
                    <el-option label="租赁" value="租赁"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange3.text"
                    placeholder="备注"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注" prop="desc" class="item">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :readonly="readonlys"
                  >
                    <img v-if="tableData1.imageUrl" :src="listchange3.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style=" line-height: 100px;"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="维保信息">
          <el-row type="flex" :gutter="24">
            <el-form ref="form" label-width="80px">
              <el-col :span="12" style="height:51px;">
                <el-form-item label="供应商" class="item" >
                  <el-input
                    v-model="listchange3.w_weibao"
                    size="small"
                    placeholder="供应商名称"
                    :readonly="readonlys"
                    
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系人" class="item" >
                  <el-input
                    v-model="listchange3.w_lianxiren"
                    size="small"
                    placeholder="联系人"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="height:51px;">
                <el-form-item label="联系方式" class="item" >
                  <el-input
                    v-model="listchange3.W_dianhua"
                    size="small"
                    placeholder="联系方式"
                    :readonly="readonlys"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height:51px;">
                <el-form-item label="维保到期" class="item">
                  <el-form-item prop="date1" class="item">
                    <el-date-picker
                      type="date"
                      placeholder="维保到期时间"
                      v-model="listchange3.W_time"
                      :disabled="disabled"
                      style="width: 100%;"
                      size="small"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="维保说明" prop="desc" class="item">
                  <el-input
                    type="textarea"
                    v-model="listchange3.W_shuoming"
                    placeholder="维保说明"
                    :readonly="readonlys"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bianVisible = false">取 消</el-button> 
        <el-button type="primary" @click="chenggongbian('listchange3')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import crumbs from "@/components/index/crumbs.vue";
import status from "@/components/index/status.vue";
export default {
  data() {
    return {
      num: '',
      activeName: "first",
      input3: "",
      select: "",
      tableData2: [],
      dialogFormVisible: false, // 对话框
      listchange: {
        default: this.tableData1
      },
      listchange2: {
        default: this.tableData1
      },
      listchange3: {
        default: this.tableData1
      },
      disabled:false,
      chaVisible: false,
      bianVisible: false,
      readonlys: false,
      tabPosition: "left",
      tableData1: {
        Statuss: 0,
        zichanma: "",
        zichanname: "",
        type: "",
        typesize: "",
        indexs: "",
        danwei: "",
        monet: "",
        gongsi: "",
        bumen: "",
        date: "",
        people: "",
        guanli: "",
        address: "",
        time: "",
        yuantou: "",
        w_weibao:"",
        w_lianxiren:"",
        W_dianhua:"",
        W_time:"",
        W_shuoming:""

      },
      rules: {
        zichanname: { required: true, message: "资产名称不能为空", trigger: "blur" },
        type: { required: true, message: "资产类型不能为空", trigger: "blur" },
        typesize: { required: true, message: "规格型号不能为空", trigger: "blur" },
        indexs: { required: true, message: "产品序列不能为空", trigger: "blur" },
        danwei: { required: true, message: "计量单位不能为空", trigger: "blur" },
        monet: { required: true, message: "金额不能为空", trigger: "blur" },
        gongsi: { required: true, message: "使用公司不能为空", trigger: "blur" },
        bumen: { required: true, message: "使用部门不能为空", trigger: "blur" },
        date: { required: true, type: "date", message: "选择日期不能为空", trigger: "change" },
        people: { required: true, message: "使用人不能为空", trigger: "change" },
        guanli: { required: true, message: "管理员不能为空", trigger: "change" },
        address: { required: true, message: "存放地点不能为空", trigger: "blur" },
        time: { required: true, message: "使用期限不能为空", trigger: "blur" },
        yuantou: { required: true, message: "来源不能为空", trigger: "blur" },
      },
      ruless: {
        w_weibao: { required: true, message: "供应商不能为空", trigger: "blur" },
        w_lianxiren: { required: true, message: "联系人不能为空", trigger: "blur" },
        W_dianhua: { required: true, message: "联系方式不能为空", trigger: "blur" },
        W_time: { required: true, message: "维保到期时间不能为空", trigger: "blur" }
      },
      currentPage1: 1,
      activeName: "first",
      inputbook: "",
      duixiangs: []
    };
  },
  components: {
    crumbs,
    status
  },
  mounted(){
    this.$axios.get('/api/message1').then((res) =>{
      if(res.data.code==200){
        this.tableData2=res.data.date
      }else{
         this.$message.error('请求失败');
        return error
      }
      
    })
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClick2() {
      alert("button click");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    },
    //添加
    addmess() {
      this.dialogFormVisible = true;
      let newfprm = JSON.parse(JSON.stringify(this.tableData1));
      this.listchange = newfprm;
      this.readonlys = false;
      
    },
    //编辑
    changemess(ins, index) {
      this.num = index;
      this.bianVisible = true;
      let newfprm = JSON.parse(JSON.stringify(ins));
      this.listchange3 = newfprm;
      this.readonlys = false;
      this.disabled = false;
    },
    //查看
    readmess(ins) {
      this.chaVisible = true;
      let newfprm = JSON.parse(JSON.stringify(ins));
      this.listchange2 = newfprm;
      this.readonlys = true;
      this.disabled = true;
    },
    deleteone(val) {
      this.duixiangs = val;
      console.log(val)
    },
    deleteall(val) {
      this.duixiangs = val;
      console.log(val)
    },
    dell() {
      if (this.duixiangs.length > 0) {
        console.log(this.duixiangs)
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
             this.duixiangs.forEach((i,v)=>{
               this.tableData2.forEach((a,b)=>{
                  if(i==a){
                    this.tableData2.splice(b,1)
                  }
                })
              })
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
    },
    chenggongbian(listchange3){
      // let newfprm = JSON.parse(JSON.stringify(this.listchange3));
      // this.listchange3 = newfprm;
      // console.log(newfprm) 
      // this.listchange3 = newfprm;
      this.bianVisible = false;
      this.tableData2[this.num] = JSON.parse(JSON.stringify(this.listchange3));

      const aa = JSON.parse(JSON.stringify(this.tableData2));
      this.tableData2 = [];
      this.tableData2 = aa;
      console.log(this.tableData2);
      // JSON.parse(JSON.stringify(this.listchange3));
      // this.tableData2.push(newfprm)
       
    },
    // 新增确定按钮
    open2(listchange) {
      this.$refs[listchange].validate(valid => {
        if (valid) {
          // console.log('listchange=====',this.listchange)
          // this.duixiangs.push(this.listchange);
          let newfprm = JSON.parse(JSON.stringify(this.listchange));
          this.tableData2.push(newfprm)
          // console.log('listchange=====',this.listchange)
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
          this.dialogFormVisible = false;
        } else {
            console.log('error submit!!');
            return false;
        }
        
      })
    },
    resetForm(listchange) {
        this.$refs[listchange].resetFields();
    }
  }  
} 
</script>
<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown {
  margin-left: 15px;
}
.box-card i {
  font-size: none;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-select .el-input {
  /* width: 130px; */
  height: 32px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-icon-plus {
  font-size: normal;
}
.item {
  margin-bottom: 7px !important;
}

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
  width: 169px;
  height: 100px;
  line-height: 168px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el_border{
    border-top: 1px solid #ebeef5;
    margin-top: 6px !important;
    /* padding: 0 15px; */
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
.el-col-8{
  margin-bottom: 6px;
}

</style>


