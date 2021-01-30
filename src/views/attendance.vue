<template>
    <div>
        <el-form>
            <el-formItem label="报名表">
                <el-input type="textarea" class="sign" v-model="signList">
                </el-input>
            </el-formItem>
        </el-form>
        <el-row>
            <el-col :span="1">
                <el-button type="primary" @click="convert">转换</el-button>
            </el-col>
            <el-col :span="1" style="margin-right: 10px;">
                <el-input v-model="newperson"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="add">添加</el-button>
            </el-col>
            <el-col :span="1" style="margin-right: 10px;">
                <el-input v-model="multy"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="addMore">添加多个</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" @click="clear">清空</el-button>
            </el-col>
        </el-row>
        <!--        <el-row>-->
        <!--            <el-col :span="4">-->
        <!--                <ul>-->
        <!--                    <li v-for="(item, index) in signData" :key="index"> {{index + 1}}.{{item}}</li>-->
        <!--                </ul>-->
        <!--            </el-col>-->
        <!--        </el-row>-->
        <!--        <div>-->
        <!--            {{$data}}-->
        <!--        </div>-->
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
                multy:0

            }
        },
        computed: {},
        methods: {
            convert() {
                this.signData = this.signList.split('\n').map(_ => _.split('.')[1].trim()).filter(_ => _ && _.trim())
                //  this.signData = this.signList.split('\n').map(_=>_.split('.')[1].trim())
                this.signList = this.signData.map((item, index) => (index + 1) + '.' + item + '\n').join('')
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
            }
        },
        created() {

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

</style>