<template>
    <div>
        <JInput v-model="model.username"></JInput>
        <JInput v-model="model.password" type="password"></JInput>
        {{model}}
    </div>
</template>

<script>
    import JInput from "./JInput";
    export default {
        name: "index",
        components: {
            JInput
        },
        data() {
            return {
                model: {
                    username:'tom',
                    password:''
                }
            }
        }
    }
</script>

<style scoped>

</style>