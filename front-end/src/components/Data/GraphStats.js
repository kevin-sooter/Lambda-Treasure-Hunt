const graph_stats = graph => {
  if (Object.keys(graph).length !== 0) {
    console.log('GRAPH STATS INPUT: ', graph);
    let result = {};
    let graph_arr_result = graph_arr(graph);
    result.min_max_cords = min_max_cords(graph_arr_result);
    result.graph_arr = graph_arr_result;
    result.grid_size = calculate_grid_size(
      result.min_max_cords.max_x,
      result.min_max_cords.min_x,
      result.min_max_cords.max_y,
      result.min_max_cords.min_y
    );

    // console.log(result); // <-- Debugging
    return result;
  }
};

const graph_arr = function(graph) {
  const all_cords = [];
  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      all_cords.push(graph[k].coordinates);
    }
  }
  return all_cords;
};

const min_max_cords = function(GraphArr) {
  const result = {
    max_x: Number(GraphArr[0][0]),
    min_x: Number(GraphArr[0][0]),
    max_y: Number(GraphArr[0][1]),
    min_y: Number(GraphArr[0][1]),
  };
  for (let i = 1; i < GraphArr.length; i++) {
    if (GraphArr[i][0] > result.max_x) {
      result.max_x = GraphArr[i][0];
    }
    if (GraphArr[i][0] < result.min_x) {
      result.min_x = GraphArr[i][0];
    }
    if (GraphArr[i][1] > result.max_y) {
      result.max_y = GraphArr[i][1];
    }
    if (GraphArr[i][1] < result.min_y) {
      result.min_y = GraphArr[i][1];
    }
  }
  return result;
};

let calculate_grid_size = (max_x, min_x, max_y, min_y) => {
  let x_arr = [];
  let y_arr = [];
  for (let i = min_x; i <= max_x; i++) {
    x_arr.push(i);
  }
  for (let i = min_y; i <= max_y; i++) {
    y_arr.push(i);
  }
  return { x: x_arr, y: y_arr };
};

//TESTING GRAPH STATS
// let test_graph = {
//   100: { n: "-", s: 106, w: "?", e: 112, coordinates: ["64", "54"] },
//   106: { n: 100, s: "?", w: "?", e: "?", coordinates: ["64", "54"] },
//   112: { n: "-", s: 141, w: 100, e: "?", coordinates: ["65", "54"] },
//   141: { n: 112, s: "-", w: "-", e: 156, coordinates: ["65", "53"] },
//   156: { n: "-", s: 168, w: 141, e: 164, coordinates: ["66", "53"] },
//   164: { n: 217, s: "-", w: 156, e: "?", coordinates: ["67", "53"] },
//   168: { n: 156, s: "-", w: "-", e: 340, coordinates: ["66", "52"] },
//   217: { n: "-", s: 164, w: "-", e: 247, coordinates: ["67", "54"] },
//   247: { n: "-", s: "-", w: 217, e: 261, coordinates: ["68", "54"] },
//   261: { n: "-", s: 277, w: 247, e: 322, coordinates: ["69", "54"] },
//   277: { n: 261, s: "-", w: "-", e: 323, coordinates: ["69", "53"] },
//   322: { n: 382, s: "-", w: 261, e: 435, coordinates: ["70", "54"] },
//   323: { n: "-", s: "-", w: 277, e: 433, coordinates: ["70", "53"] },
//   340: { n: "-", s: "-", w: 168, e: "-", coordinates: ["67", "52"] },
//   382: { n: "-", s: 322, w: "-", e: 388, coordinates: ["70", "55"] },
//   388: { n: "-", s: "-", w: 382, e: 477, coordinates: ["71", "55"] },
//   433: { n: "-", s: 455, w: 323, e: 460, coordinates: ["71", "53"] },
//   435: { n: "-", s: "-", w: 322, e: "-", coordinates: ["71", "54"] },
//   455: { n: 433, s: "-", w: "-", e: "-", coordinates: ["71", "52"] },
//   460: { n: "-", s: "-", w: 433, e: "-", coordinates: ["72", "53"] },
//   477: { n: "-", s: "-", w: 388, e: 483, coordinates: ["72", "55"] },
//   483: { n: "-", s: "-", w: 477, e: "-", coordinates: ["73", "55"] }
// };

// let test_stats = graph_stats(test_graph);
// print(test_stats);
/////////////////////

export default graph_stats;
