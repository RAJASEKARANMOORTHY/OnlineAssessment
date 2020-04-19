// 347. Top K Frequent Elements

// Given a non-empty array of integers, return the k most frequent elements.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]
// Note:

// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

// https://leetcode.com/problems/top-k-frequent-elements/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    let hash = new Map();
    let output = [];

    for (let num of nums) {
        if (hash.has(num)) {
            let count = hash.get(num) + 1;
            hash.set(num, count);
        } else {
            hash.set(num, 1);
        }
    };

    let queue = new PriorityQueue([]);
    for (let [key, value] of hash.entries()) {
        queue.enqueue({
            value: key,
            priority: value
        });
    }

    while (queue.size > 0 && k > 0) {
        let current = queue.dequeue();
        output.push(current.value);
        k--;
    }

    return output;
}

var PriorityQueue = function () {
    this.array = [];
    this.length = 0;
    this.size = 0;

    this.dequeue = function () {
        if (this.array.length > 0) {
            this.size -= 1;
            let current = this.array.pop();
            this.maxHeapify();
            return current;
        }
    }

    this.peek = function () {
        return this.array[this.array.length - 1];
    };

    this.enqueue = function (value) {
        this.size += 1;
        this.array.unshift(value);
        this.length = this.array.length;
        this.maxHeapify();
    };

    this.maxHeapify = function () {
        for (let index = parseInt(this.length / 2); index >= 0; index--) {
            this.maxHeap(index);
        }

        if (this.length > 0) {
            this.swap(0, this.length - 1);
            this.length -= 1;
        }
    };

    this.maxHeap = function (index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;

        let maxIndex = index;
        if (left >= 0 && left < this.length && this.array[left].priority > this.array[maxIndex].priority) {
            maxIndex = left
        }

        if (right >= 0 && right < this.length && this.array[right].priority > this.array[maxIndex].priority) {
            maxIndex = right
        }

        if (maxIndex != index) {
            this.swap(maxIndex, index);
            this.maxHeap(maxIndex);
        }
    }

    this.swap = function (src, target) {
        let temp = this.array[src];
        this.array[src] = this.array[target];
        this.array[target] = temp;
    }
}


console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
console.log(topKFrequent([1], 1));
console.log(topKFrequent([1, 2], 2));
console.log(topKFrequent([3, 0, 1, 0], 1));

console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))