function solveMathProblem() {
    const problem = document.getElementById('mathProblem').value.trim();
    const resultElement = document.getElementById('result');

    // 檢查輸入是否為空
    if (problem === "") {
        resultElement.innerHTML = "<p class='error'>請輸入數學題目！</p>";
        return;
    }

    try {
        // 使用 math.js 解析並計算數學問題
        const result = math.evaluate(problem);
        const simplifiedProblem = math.simplify(problem); // 簡化數學表達式

        // 提供結果與解釋
        resultElement.innerHTML = `
            <p><strong>計算結果：</strong> ${result}</p>
            <p class="step"><strong>解釋：</strong>原始問題：${simplifiedProblem}。根據數學規則，結果為 ${result}。</p>
        `;
    } catch (error) {
        resultElement.innerHTML = "<p class='error'>無法識別的數學題目，請檢查格式並重新輸入。</p>";
    }
}


