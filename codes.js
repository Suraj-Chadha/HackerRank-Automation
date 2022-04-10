module.exports = {
    answer: [
        `import java.io.*;
        import java.util.*;
        import java.text.*;
        import java.math.*;
        import java.util.regex.*;
        
        public class Solution {
        
        
            static int solveMeFirst(int a, int b) { 
                  return a+b;
           }
        
         public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                int a;
                a = in.nextInt();
                int b;
                b = in.nextInt();
                int sum;
                sum = solveMeFirst(a, b);
                System.out.println(sum);
           }
        }
        `,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                int n = scn.nextInt();
                int ans = 0;
                for(int i = 0; i < n; i++){
                    int x = scn.nextInt();
                    ans+=x;
                }
                System.out.println(ans);
            }
        }`,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                int n = scn.nextInt();
                long ans = 0;
                for(int i = 0; i < n; i++){
                    long x = scn.nextInt();
                    ans+=x;
                }
                System.out.println(ans);
            }
        }`
        ,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                int n = scn.nextInt();
                // int m = scn.nextInt();
                int[][] arr = new int[n][n];
                for(int i = 0; i < n; i++){
                    for(int j = 0; j < n; j++){
                        arr[i][j] = scn.nextInt();
                    }
                }
                int diff = findDiff(arr);
                System.out.println(diff);
            }
            public static int findDiff(int[][] arr){
                int ans = 0;
                int lD = 0;
                int rD = 0;
                for(int i = 0; i < arr.length; i++){
                    for(int j = 0; j < arr[0].length; j++){
                        if(i == j){
                            lD+=arr[i][j];
                        }
                        if(i + j == arr.length - 1){
                            rD += arr[i][j];
                        }
                    }
                }
                ans= (lD>rD ? lD-rD : rD-lD);
                return ans;
            }
        }`,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
               Scanner scn = new Scanner(System.in);
               int n = scn.nextInt();
               int[] arr = new int[n];
               for(int i = 0; i < n; i++){
                   arr[i] = scn.nextInt();
               }
               int countP = 0, cN = 0, c0 = 0;
               for(int i = 0; i < arr.length; i++){
                   if(arr[i] > 0){
                       countP++;
                   }else if( arr[i] < 0){
                       cN++;
                   }else{
                       c0++;
                   }
               }
               System.out.println((float)countP/n);
               System.out.println((float)cN/n);
               System.out.println((float)c0/n);
        }
        }`,
        `import java.io.*;
        import java.math.*;
        import java.security.*;
        import java.text.*;
        import java.util.*;
        import java.util.concurrent.*;
        import java.util.function.*;
        import java.util.regex.*;
        import java.util.stream.*;
        import static java.util.stream.Collectors.joining;
        import static java.util.stream.Collectors.toList;
        
        class Result {
        
            /*
             * Complete the 'staircase' function below.
             *
             * The function accepts INTEGER n as parameter.
             */
        
            public static void staircase(int n) {
            // Write your code here
                int nspc = n-1;
                int nstr = 1;
                for(int rows = 1; rows <= n; rows++){
                    for(int i = 1; i <= nspc; i++){
                        System.out.print(" ");
                    }
                    for(int i = 1; i <= nstr; i++){
                        System.out.print("#");
                    }
                    nstr++;
                    nspc--;
                    System.out.println();
                }
        
            }
        
        }
        
        public class Solution {
            public static void main(String[] args) throws IOException {
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        
                int n = Integer.parseInt(bufferedReader.readLine().trim());
        
                Result.staircase(n);
        
                bufferedReader.close();
            }
        }
        `,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                long[] arr = new long[5];
                long total = 0;
                for(int i = 0; i < 5; i++){
                    arr[i] = scn.nextLong();
                    total+=arr[i];
                }
                long max = Long.MIN_VALUE;
                long min = Long.MAX_VALUE;
                for(int i = 0; i < 5; i++){
                    long eSum = total - arr[i];
                    if(eSum > max){
                        max = eSum;
                    }
                    if(eSum < min){
                        min = eSum;
                    }
                }
                System.out.println(min+" "+max);
            }
        }`,
        `import java.util.*;

        public class Solution{
            
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                int n =scn.nextInt();
                int[] arr = new int[n];
                for(int i = 0; i < n; i++){
                    arr[i] = scn.nextInt();
                }
                int max = arr[0];
                int count = 1;
                for(int i = 1; i < n;i++){
                    if(arr[i] > max){
                        max = arr[i];
                        count = 1;
                    }else if(arr[i] == max){
                        count++;
                    }
                }
                System.out.println(count);
            }
        }`,
        `import java.io.*;
        import java.math.*;
        import java.security.*;
        import java.text.*;
        import java.util.*;
        import java.util.concurrent.*;
        import java.util.function.*;
        import java.util.regex.*;
        import java.util.stream.*;
        import static java.util.stream.Collectors.joining;
        import static java.util.stream.Collectors.toList;
        
        class Result {
        
            /*
             * Complete the 'timeConversion' function below.
             *
             * The function is expected to return a STRING.
             * The function accepts STRING s as parameter.
             */
        
            public static String timeConversion(String s) {
            // Write your code here
                int h = Integer.parseInt(s.substring(0,2));
                String c = s.substring(2,s.length()-2);
                String check = s.substring(s.length() - 2);
                // System.out.println(check);
                if(check.equals("PM")){
                    if(h != 12){
                        h+=12;
                    }
                }else{
                    if(h == 12){
                        h = 0;
                    }
                }
                // return check;
                if(h < 10){
                    return "0"+h+c;
                }
                return h + c;
            }
        
        }
        
        public class Solution {
            public static void main(String[] args) throws IOException {
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
                BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));
        
                String s = bufferedReader.readLine();
        
                String result = Result.timeConversion(s);
        
                bufferedWriter.write(result);
                bufferedWriter.newLine();
        
                bufferedReader.close();
                bufferedWriter.close();
            }
        }
        `,
        `import java.util.*;

        public class Solution{
            public static void main(String[] args){
                Scanner scn = new Scanner(System.in);
                int n = scn.nextInt();
                for(int i = 0; i < n; i++){
                    int g = scn.nextInt();
                    if(g <= 35){
                        System.out.println(g);
                    }else{
                        if(5-g%5 <3)
                        System.out.println(g+(5-(g%5)));
                        else{
                            System.out.println(g);
                        }
                    }
            }
        }
        }`

    ]
}