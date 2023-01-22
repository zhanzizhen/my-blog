```sql
SELECT o.custid, c.name, MAX(o.payment)
  FROM orders AS o, customers AS c
  WHERE o.custid = c.custid
  GROUP BY o.custid;
 ```
 

我的理解（不知完善不）：当mysql开启only_full_group_by模式的时候，仅当c.name和o.custid是一一对应的，那么上面这段sql是合法的。
