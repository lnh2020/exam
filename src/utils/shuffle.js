/**
 * Fisher–Yates 洗牌算法 - 原地打乱数组
 * @param {Array} arr - 需要乱序的数组
 * @returns {Array} 乱序后的原数组
 */
export default function shuffle(arr) {
  // 从最后一个元素开始向前遍历
  for (let i = arr.length - 1; i > 0; i--) {
    // 生成 0 ~ i 之间的随机索引
    const j = Math.floor(Math.random() * (i + 1));
    // 交换元素位置
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
