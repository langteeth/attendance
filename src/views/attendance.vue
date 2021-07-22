<template>
    <div>
        <el-form>
            <el-formItem label="报名表">
                <el-input type="textarea" class="sign" v-model="signList">
                </el-input>
            </el-formItem>
        </el-form>
        <el-row class="distance">
            <el-col :span="4" class="convert">
                <el-button width="100%" type="primary" @click="convert">生成报名表</el-button>
            </el-col>
            <el-col :span="4" class="distance">
                <el-input v-model="newperson"></el-input>
            </el-col >
            <el-col :span="2" class="add">
                <el-button type="primary" @click="add">添加</el-button>
            </el-col>
            <el-col :span="2" class="addmulty">
                <el-button type="danger" @click="clear">清空</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2" class="total">
                <el-input v-model="multy">总数</el-input>
            </el-col>
            <el-col :span="2" class="add">
                <el-button  type="primary" @click="addMore">添加多个</el-button>
            </el-col>
        </el-row>
<!--        <ul v-for="item in listData " :key="item.id">-->
<!--            <li v-for="subitem in listData.nameList" :key="subitem">{{subitem}</li>-->
<!--        </ul>-->
        <ul>
            <li >{{}</li>
        </ul>
        <div>
            {{$data.listData}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "attendance",
        data() {
            return {
                signList: ``,
                signData: [],
                newperson: '',
                multy:0,
                listData:[]

            }
        },
        computed: {
            context() {//报名正文
               const i = this.signList.search('\n1.')
               const j = this.signList.lastIndexOf('\n')
               return this.signList.substring(i,j).trim()
            },
            excelData() {

            }
        },
        methods: {
            convert() {
                this.signData = this.signList.split('\n').map(_ => _.split('.')[1].trim('')).filter(_ => _ && _.trim())
                 this.signData = this.signList.split(' ').map(_=>_.split('.')[1].trim())
                this.signList = this.signData.map((item, index) => (index + 1) + '.' + item + '\n').join('')
                // this.signList = this.signData.map((item, index) => ( item + '\n').join(''))
            },
            add() {
                if (this.newperson) {
                    this.signData.push(this.newperson)
                    this.signList = this.signData.map((item, index) => (index + 1) + '.' + item + '\n').join('')
                } else {
                    this.$message.info('请添加姓名')
                }

            },
            addMore() {
                for (let i = 0;i<this.multy;i++) {
                    this.signData.push('')
                }
                this.signList = this.signData.map((item, index) => (index + 1) + '.' + item + '\n').join('')
            },
            clear() {
                this.signList = ''
                this.signData = []
            },
            getList() {
                this.$axios.get('http://localhost:3000/signList').then(res =>{
                   this.listData = res.data
                    console.log(this.listData)
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    .sign >>> .el-textarea__inner {
        height: 400px;
    }
    .distance {
        margin-bottom: 2rem;
    }
    @media screen and (min-width: 300px) and (max-width: 768px){
        .convert {
            margin-right:3rem;
        }
        .number {
            margin-right: 1rem;
        }
        .total {
            margin-right: 1rem;
        }
        .add {
            margin-right: 3rem;
        }
        .addmulty {
            margin-right: 5rem;
        }
    }
</style>