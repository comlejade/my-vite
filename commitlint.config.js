module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // type 不允许为空
        'type-enum': [
            2, // 出发这条规则时 error 提示
            "always", // 违背这条规则时，则根据 (level) 进行提示
            [
                "feat", // 新功能
                "fix", // bug修复
                "docs", // 文档更新
                "style", // 样式调整
                "refactor", // 代码重构
                "test", // 编写测试用例
                "revert", // 代码回滚
                "chore", // 项目配置更新
                "perf", // 性能优化
            ]
        ]
    }
}
