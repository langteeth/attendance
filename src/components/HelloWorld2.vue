<template>
    <div class="hello" @click="$parent.$emit('mua')">
        <h1 @click="$emit('foo','bar')">{{ msg}}</h1>
        <h2>{{foo}}</h2>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld2",
        props: {
            msg: String
        },
        data() {
            return {
                foo: 'foo'
            }
        },
        created() {
            this.$parent.$on('kiss', () => {
                console.log('kiss')
            })
        }
    }
</script>

<style scoped>

</style>