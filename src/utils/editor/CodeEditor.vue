<template>
    <div class="json-editor">
        <textarea ref="textarea"></textarea>
    </div>
</template>

<script>
import { refs, onMounted, toRefs,reactive } from 'vue'
import CodeMirror from 'codemirror'
import "codemirror/lib/codemirror.css";
import 'codemirror/mode/javascript/javascript'

// 代码错误检查
// eslint-disable-next-line import/no-webpack-loader-syntax
require("script-loader!jsonlint");
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

// 主题样式（我直接用了纯白色的，看着比较舒服）
import "codemirror/theme/rubyblue.css";
// 括号显示匹配
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
// 括号、引号编辑和删除时成对出现
import "codemirror/addon/edit/closebrackets";
// 折叠代码要用到一些玩意
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";


export default {
    name: 'CodeEditor',
    props: {
        jsonCode: {
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const jsonEditor = useRef(null);
        const state = reactive({
            jsonCode: props.jsonCode || '',
        });
        onUnmount(()=>{
            jsonEditor = CodeMirror.fromTextArea(jsonEditor.current, {
                mode: "application/json",
                theme: 'base16-light',
                lineNumbers: true,
                lineWrapping: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                matchBrackets: true,
                autoCloseBrackets: true,
                styleActiveLine: true,
                theme: "rubyblue",
                readOnly: props.readonly,
                lint: true,
                json: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                extraKeys: {
                    "Ctrl-Q": function(cm) {
                        cm.foldCode(cm.getCursor());
                    }
                }
            });
            jsonEditor.setValue(JSON.stringify(state.jsonCode, null, 4));
            jsonEditor.on('change', function(cm, change) {
                state.jsonCode = cm.getValue();
            });
        })

        const refresh = () => {
            jsonEditor.current.refresh();
        }
    }
}
</script>