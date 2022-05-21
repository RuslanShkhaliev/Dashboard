<template>
    <div class="page-not-found">
        <div class="content">
            <h1>404</h1>
           <p>Page <span> "{{$route.path.replace(/\//, '')}}" </span> not found</p>
        </div>
        <router-link :to="{name: 'dashboard'}">Go back</router-link>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped lang="scss">
    .page-not-found {
        height: 100%;
        background: #000;
        display: flex;
        flex-direction: column;
        .content {
            color: #fff;
            width: 100%;
            padding: 50px;
            h1 {
                font-size: 40vw;
                text-align: center;
            }
            p {
                display: flex;
                justify-content: flex-end;
                font-size: calc(15px + .5vw);
                font-weight: 300;
                white-space: nowrap;
                span {
                    padding: 0 6px;
                    text-decoration: line-through;
                    font-style: italic;
                }
                
            }
            @media (min-width: 769px) {
                width: 75vw;
                h1 {
                    line-height: .8;
                }
            }
        }
        a {
            margin: 0 auto 0;
            padding: 10px 20px;
            color: rgba(238, 25, 186, 0.4);
            letter-spacing: 2px;
            &:hover {
                font-weight: 500;
                text-shadow: 0 0 4px rgba(#EE19BA, .5)
            }
        }
    }
</style>