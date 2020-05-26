// Q1 

function solution(record) {
    let answer = [];
    let newUser = new Map();
    let length = record.length;

	
    for (let i = 0; i < length; i++)
    {
        let arr = record[i].split(" ");

        if (!/Leave/i.test(arr[0]))
            newUser.set(arr[1], arr[2]);
    }

	// enter or leave
    for (let i = 0; i < length; i++)
    {
        let arr = record[i].split(" ");

        if (/Enter/i.test(record[i]))
            answer[i] = `${newUser.get(arr[1])} came in.`;
        else if (/Leave/i.test(record[i]))
            answer[i] = `${newUser.get(arr[1])} has left.`;
    }
    
    return answer;
}

console.log(solution(["Enter uid1234 Muzi","Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"])
);


// End Of Q1
--------------------
// Q2

function solution(N, stages) {
    let answer = [];
    let failRateArray = [];
    let stagesSize = stages.length;
        
    for (let i = 1; i <= N; i++) {
        let top = 0;
        let bottom = 0;
        
        for (let j = 0; j < stagesSize; j++) {
            if (stages[j] === i) {
                top++;
                bottom++;
            }
            else if (stages[j] > i) {
                bottom++;
            }
        }


        failRateArray.push({
            stage: i,
            failRate: bottom === 0 || top === 0 ? 0 : top/bottom
        });
    }


    failRateArray.sort((a, b) => {
            if (a.failRate === b.failRate)
                return a.stage - b.stage;
        
            return b.failRate - a.failRate
    });

    for (let i = 0; i < failRateArray.length; i++)
        answer.push(failRateArray[i].stage);
    
    return answer;
}

console.log(solution(4, [4, 4, 4,4, 4, 4]));


// end of Q2
--------------------

// Q3 


function solution(relation) {
    const column = relation[0].length
    const rows = relation.length
    const sets = 1 << column
    const answer = new Set()

    for (let i=1; i<sets; i++) {
        const tmp = new Set()
        for (let row=0; row<rows; row++) {
            let key = ''
            for (let col=0; col<column; col++) {
                if (i & (1 << col)) key = String(key) + String(relation[row][col])
            }
            tmp.add(key)
        }
        if (tmp.size === rows) answer.add(i)
    }

    for (let i of answer) {
        for (let j of answer) {
            if (i >= j) continue
            if ((i & j) === i) answer.delete(j)
        }
    }

    // console.log(Array.from(answer).map(e => e.toString(2)))

    return answer.size
}

solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]])
