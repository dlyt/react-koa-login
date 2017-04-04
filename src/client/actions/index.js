/*
Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）
传到 store 的有效载荷。它是 store 数据的唯一来源。
一般来说你会通过 store.dispatch() 将 action 传到 store。

我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
 */
