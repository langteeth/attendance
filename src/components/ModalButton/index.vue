<template>
    <div >
        <Button
                :type="BtnType"
                @click="showModal=true"

        >
           {{ title }}
        </Button>
        <Modal
                v-model="showModal"
                title="编辑"

        >
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>

</template>

<script>
    export default {
        name: "ModalButton",
        props: {
            BtnType: {
              type:String,
              default: 'primary'
            },
            title: {
                type:String,
                default:'点击'
            },
            width: {
                type:Number,
                default: 800
            }
        },
        data() {
            return {
                showModal:false
            }
        },
        methods:{

        }

    }
</script>

<style scoped>

</style>