a表有m个row，b表有n个row。

```sql
select a.aname, b.bname from a inner join b on a.id=b.aid
```

# 以下内容内容存疑

上面的语句相当于：
const result = []

for(let i=0;i<a.length;i++){
  for(let j=0;j<b.length;j++){
    if(a.id===b.aid){
       result.push({
        aname: a.aname,
        bname: b.bname
       })
    }
  }
}


```sql
select a.aname, b.bname from a left join b on a.id=b.aid
```

上面的语句相当于：
const result = []

for(let i=0;i<a.length;i++){
  for(let j=0;j<b.length;j++){
    if(a.id===b.aid){
       result.push({
        aname: a.aname,
        bname: b.bname
       })
    }
  }
}
